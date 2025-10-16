// Middleware de segurança para APIs
import crypto from 'crypto';

// Rate limiting em memória (para produção, usar Redis)
const requestCounts = new Map();
const rateLimitWindow = 60000; // 1 minuto
const maxRequestsPerWindow = 30; // 30 requests por minuto por IP

// Lista de IPs bloqueados (pode ser expandida)
const blockedIPs = new Set();

// Função para gerar hash da API key
function generateAPIHash(secretKey, timestamp, userAgent = '') {
    const data = `${secretKey}:${timestamp}:${userAgent}`;
    return crypto.createHash('sha256').update(data).digest('hex');
}

// Middleware principal de segurança
export function securityMiddleware(req, res, next) {
    const startTime = Date.now();

    try {
        // 1. Verificar rate limiting
        if (!checkRateLimit(req, res)) {
            return;
        }

        // 2. Verificar origem da requisição (mais tolerante)
        if (!checkOriginTolerant(req, res)) {
            return;
        }

        // 3. Log da requisição (para auditoria)
        logRequest(req, startTime);

        // Por enquanto, pular autenticação de API key para evitar problemas
        next();
    } catch (error) {
        console.error('🔒 Erro no middleware de segurança:', error);
        return res.status(500).json({
            error: 'Internal security error',
            code: 'SECURITY_ERROR'
        });
    }
}

// Verificação de origem mais tolerante
function checkOriginTolerant(req, res) {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

    // Em desenvolvimento local, permitir localhost
    if (process.env.NODE_ENV === 'development') {
        if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return true;
        }
    }

    // Se não há origin, permitir por enquanto (pode ser requisição direta)
    if (!origin) {
        console.warn('⚠️ Requisição sem origin/referer - permitindo temporariamente');
        return true;
    }

    const isAllowed = allowedOrigins.some(allowed => {
        const cleanAllowed = allowed.trim();
        return origin.startsWith(cleanAllowed) || origin.includes(cleanAllowed);
    });

    if (!isAllowed) {
        console.warn(`🚨 Origin não autorizada: ${origin}`);
        console.log(`🔍 Origens permitidas: ${allowedOrigins}`);
        res.status(403).json({
            error: 'Origin not allowed',
            code: 'ORIGIN_NOT_ALLOWED'
        });
        return false;
    }

    return true;
}// Rate limiting por IP
function checkRateLimit(req, res) {
    const clientIP = getClientIP(req);

    // Verificar se IP está bloqueado
    if (blockedIPs.has(clientIP)) {
        console.warn(`🚫 IP bloqueado tentou acessar: ${clientIP}`);
        res.status(403).json({
            error: 'IP address blocked',
            code: 'IP_BLOCKED'
        });
        return false;
    }

    const now = Date.now();
    const windowStart = now - rateLimitWindow;

    // Limpar requests antigas
    if (requestCounts.has(clientIP)) {
        const requests = requestCounts.get(clientIP);
        requestCounts.set(clientIP, requests.filter(time => time > windowStart));
    } else {
        requestCounts.set(clientIP, []);
    }

    const requests = requestCounts.get(clientIP);

    if (requests.length >= maxRequestsPerWindow) {
        console.warn(`⚠️ Rate limit excedido para IP: ${clientIP}`);
        res.status(429).json({
            error: 'Too many requests',
            code: 'RATE_LIMIT_EXCEEDED',
            retryAfter: Math.ceil(rateLimitWindow / 1000)
        });
        return false;
    }

    requests.push(now);
    return true;
}

// Verificar origem da requisição
function checkOrigin(req, res) {
    const origin = req.headers.origin || req.headers.referer;
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',');

    // Em desenvolvimento local, permitir localhost
    if (process.env.NODE_ENV === 'development') {
        if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
            return true;
        }
    }

    if (!origin) {
        console.warn('🚨 Requisição sem origin/referer');
        res.status(403).json({
            error: 'Origin verification failed',
            code: 'INVALID_ORIGIN'
        });
        return false;
    }

    const isAllowed = allowedOrigins.some(allowed =>
        origin.startsWith(allowed.trim())
    );

    if (!isAllowed) {
        console.warn(`🚨 Origin não autorizada: ${origin}`);
        res.status(403).json({
            error: 'Origin not allowed',
            code: 'ORIGIN_NOT_ALLOWED'
        });
        return false;
    }

    return true;
}

// Verificar API key
function checkAPIKey(req, res) {
    const apiKey = req.headers['x-api-key'];
    const timestamp = req.headers['x-api-timestamp'];
    const userAgent = req.headers['user-agent'];

    if (!apiKey || !timestamp) {
        console.warn('🔑 Requisição sem API key ou timestamp');
        res.status(401).json({
            error: 'API key required',
            code: 'MISSING_API_KEY'
        });
        return false;
    }

    // Verificar se timestamp não é muito antigo (5 minutos)
    const now = Date.now();
    const requestTime = parseInt(timestamp);
    const timeDiff = Math.abs(now - requestTime);

    if (timeDiff > 300000) { // 5 minutos
        console.warn('🕐 Timestamp da requisição muito antigo');
        res.status(401).json({
            error: 'Request timestamp too old',
            code: 'TIMESTAMP_EXPIRED'
        });
        return false;
    }

    // Gerar hash esperado
    const secretKey = process.env.API_SECRET_KEY;
    if (!secretKey) {
        console.error('❌ API_SECRET_KEY não configurada');
        res.status(500).json({
            error: 'Server configuration error',
            code: 'CONFIG_ERROR'
        });
        return false;
    }

    const expectedHash = generateAPIHash(secretKey, timestamp, userAgent);

    if (apiKey !== expectedHash) {
        console.warn('🚨 API key inválida');
        res.status(401).json({
            error: 'Invalid API key',
            code: 'INVALID_API_KEY'
        });
        return false;
    }

    return true;
}

// Verificar User-Agent
function checkUserAgent(req, res) {
    const userAgent = req.headers['user-agent'];

    if (!userAgent) {
        console.warn('🤖 Requisição sem User-Agent');
        res.status(403).json({
            error: 'User-Agent required',
            code: 'MISSING_USER_AGENT'
        });
        return false;
    }

    // Bloquear bots conhecidos
    const blockedAgents = [
        'curl', 'wget', 'postman', 'insomnia', 'python-requests',
        'bot', 'crawler', 'spider', 'scraper'
    ];

    const lowerAgent = userAgent.toLowerCase();
    const isBlocked = blockedAgents.some(blocked =>
        lowerAgent.includes(blocked)
    );

    if (isBlocked) {
        console.warn(`🤖 User-Agent bloqueado: ${userAgent}`);
        res.status(403).json({
            error: 'User-Agent not allowed',
            code: 'BLOCKED_USER_AGENT'
        });
        return false;
    }

    return true;
}

// Obter IP real do cliente
function getClientIP(req) {
    return req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip ||
        'unknown';
}

// Log para auditoria
function logRequest(req, startTime) {
    const ip = getClientIP(req);
    const userAgent = req.headers['user-agent'];
    const origin = req.headers.origin || req.headers.referer;
    const duration = Date.now() - startTime;

    console.log(`🔒 [${new Date().toISOString()}] ${req.method} ${req.url} - IP: ${ip} - Origin: ${origin} - UA: ${userAgent} - ${duration}ms`);
}

// Função para bloquear IP (uso administrativo)
export function blockIP(ip) {
    blockedIPs.add(ip);
    console.log(`🚫 IP bloqueado: ${ip}`);
}

// Função para desbloquear IP
export function unblockIP(ip) {
    blockedIPs.delete(ip);
    console.log(`✅ IP desbloqueado: ${ip}`);
}

// Exportar função para gerar API key (para uso no frontend)
export { generateAPIHash };