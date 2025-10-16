// Utilitários para segurança da API

// Gerar hash da API key
async function generateAPIHash(secretKey, timestamp, userAgent = '') {
    const data = `${secretKey}:${timestamp}:${userAgent}`;
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Obter headers de segurança para requisições API
export async function getSecurityHeaders() {
    const timestamp = Date.now().toString();
    const userAgent = navigator.userAgent;
    const secretKey = import.meta.env.VITE_API_SECRET_KEY;

    if (!secretKey) {
        console.warn('⚠️ API_SECRET_KEY não configurada');
        return {};
    }

    try {
        const apiKey = await generateAPIHash(secretKey, timestamp, userAgent);

        return {
            'x-api-key': apiKey,
            'x-api-timestamp': timestamp,
            'Content-Type': 'application/json'
        };
    } catch (error) {
        console.error('❌ Erro ao gerar headers de segurança:', error);
        return {
            'Content-Type': 'application/json'
        };
    }
}

// Wrapper para fetch com headers de segurança
export async function secureFetch(url, options = {}) {
    const securityHeaders = await getSecurityHeaders();

    const secureOptions = {
        ...options,
        headers: {
            ...securityHeaders,
            ...options.headers
        },
        credentials: 'include'
    };

    return fetch(url, secureOptions);
}

// Verificar se a API está disponível com autenticação
export async function checkSecureAPIAvailable() {
    try {
        const response = await secureFetch('/api/users', {
            method: 'GET'
        });

        return response.ok;
    } catch (error) {
        console.warn('🔒 API segura não disponível:', error.message);
        return false;
    }
}

// Rate limiting no cliente (prevenção adicional)
class ClientRateLimit {
    constructor(maxRequests = 20, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = [];
    }

    canMakeRequest() {
        const now = Date.now();
        this.requests = this.requests.filter(time => (now - time) < this.windowMs);

        if (this.requests.length >= this.maxRequests) {
            console.warn('⚠️ Rate limit atingido no cliente');
            return false;
        }

        this.requests.push(now);
        return true;
    }

    getTimeUntilReset() {
        if (this.requests.length === 0) return 0;

        const oldestRequest = Math.min(...this.requests);
        const resetTime = oldestRequest + this.windowMs;
        return Math.max(0, resetTime - Date.now());
    }
}

export const apiRateLimit = new ClientRateLimit();

// Interceptador para tratamento de erros de segurança
export function handleSecurityError(error, response) {
    if (!response) return;

    switch (response.status) {
        case 401:
            console.error('🔑 Erro de autenticação:', error);
            break;
        case 403:
            console.error('🚫 Acesso negado:', error);
            break;
        case 429:
            console.error('⚡ Rate limit excedido:', error);
            const retryAfter = response.headers.get('retry-after') || 60;
            console.log(`Tente novamente em ${retryAfter} segundos`);
            break;
        default:
            console.error('🔒 Erro de segurança:', error);
    }
}