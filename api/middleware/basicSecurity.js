// Middleware de segurança simplificado e estável

// Rate limiting em memória
const requestCounts = new Map();
const rateLimitWindow = 60000; // 1 minuto
const maxRequestsPerWindow = 100; // Mais permissivo

// Middleware básico de segurança
export function basicSecurityMiddleware(req, res, next) {
    try {
        // 1. Rate limiting básico
        const clientIP = getClientIP(req);
        if (!checkBasicRateLimit(clientIP)) {
            res.status(429).json({
                error: 'Too many requests',
                code: 'RATE_LIMIT_EXCEEDED'
            });
            return;
        }

        // 2. Log básico
        console.log(`🔒 ${req.method} ${req.url} - IP: ${clientIP} - Origin: ${req.headers.origin || 'N/A'}`);

        // 3. Continuar
        next();
    } catch (error) {
        console.error('🚨 Erro no middleware básico:', error);
        next(); // Continuar mesmo com erro
    }
}

// Rate limiting simplificado
function checkBasicRateLimit(clientIP) {
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
        console.warn(`⚡ Rate limit para IP: ${clientIP}`);
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
        'unknown';
}