// Middleware de segurança básico sem dependências Node.js

// Rate limiting em memória
const requestCounts = new Map();
const rateLimitWindow = 60000; // 1 minuto
const maxRequestsPerWindow = 50; // Requests por minuto

// Middleware super básico só com rate limiting
export function simpleSecurityMiddleware(req, res, next) {
    try {
        // Rate limiting básico
        const clientIP = getClientIP(req);

        if (!checkSimpleRateLimit(clientIP)) {
            console.warn(`⚡ Rate limit excedido para IP: ${clientIP}`);
            res.status(429).json({
                error: 'Too many requests',
                code: 'RATE_LIMIT_EXCEEDED'
            });
            return;
        }

        // Log básico
        console.log(`📊 ${req.method} ${req.url} - IP: ${clientIP}`);

        next();
    } catch (error) {
        console.error('🚨 Erro no middleware:', error);
        next(); // Continuar mesmo com erro
    }
}

// Rate limiting simplificado
function checkSimpleRateLimit(clientIP) {
    const now = Date.now();
    const windowStart = now - rateLimitWindow;

    if (!requestCounts.has(clientIP)) {
        requestCounts.set(clientIP, []);
    }

    const requests = requestCounts.get(clientIP);
    // Limpar requests antigas
    const recentRequests = requests.filter(time => time > windowStart);
    requestCounts.set(clientIP, recentRequests);

    if (recentRequests.length >= maxRequestsPerWindow) {
        return false;
    }

    recentRequests.push(now);
    return true;
}

// Obter IP do cliente
function getClientIP(req) {
    return req.headers['x-forwarded-for']?.split(',')[0] ||
        req.headers['x-real-ip'] ||
        req.connection?.remoteAddress ||
        req.socket?.remoteAddress ||
        req.ip ||
        'unknown';
}

// Função de limpeza periódica (executar ocasionalmente)
export function cleanupRateLimit() {
    const now = Date.now();
    const cutoff = now - rateLimitWindow;

    for (const [ip, requests] of requestCounts.entries()) {
        const recentRequests = requests.filter(time => time > cutoff);
        if (recentRequests.length === 0) {
            requestCounts.delete(ip);
        } else {
            requestCounts.set(ip, recentRequests);
        }
    }
}