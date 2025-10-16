import { getSecurityHeaders, secureFetch, handleSecurityError, apiRateLimit } from '../utils/security.js';

const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api'
    : '/api'; // Usar Vercel dev para desenvolvimento também

const apiRequest = async (endpoint, options = {}) => {
    try {
        // Verificar rate limiting no cliente
        if (!apiRateLimit.canMakeRequest()) {
            const resetTime = Math.ceil(apiRateLimit.getTimeUntilReset() / 1000);
            throw new Error(`Rate limit atingido. Tente novamente em ${resetTime} segundos.`);
        }

        const url = `${API_BASE_URL}${endpoint}`;
        const securityHeaders = await getSecurityHeaders();

        const config = {
            headers: {
                ...securityHeaders,
                ...options.headers
            },
            credentials: 'include',
            ...options
        };

        const response = await fetch(url, config);

        // Verificar se a resposta é JSON válida
        let data;
        try {
            data = await response.json();
        } catch (parseError) {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            data = {};
        }

        if (!response.ok) {
            handleSecurityError(data, response);
            throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        return data;
    } catch (error) {
        console.error('Erro na API:', error);
        throw error;
    }
};

export const userAPI = {
    saveUser: async (userData) => {
        return apiRequest('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },

    getAllUsers: async () => {
        return apiRequest('/users');
    },

    getUser: async (playerName) => {
        return apiRequest(`/users/${encodeURIComponent(playerName)}`);
    },

    updateActivity: async (playerName) => {
        return apiRequest(`/users/${encodeURIComponent(playerName)}/activity`, {
            method: 'PUT'
        });
    },

    clearAllData: async () => {
        return apiRequest('/users', {
            method: 'DELETE'
        });
    },

    healthCheck: async () => {
        return apiRequest('/health');
    }
};

export const checkAPIAvailable = async () => {
    try {
        // Tentar uma requisição simples para verificar disponibilidade
        await userAPI.getAllUsers();
        console.log('✅ API segura disponível');
        return true;
    } catch (error) {
        console.warn('⚠️ API segura não disponível, usando localStorage como fallback:', error.message);
        return false;
    }
};