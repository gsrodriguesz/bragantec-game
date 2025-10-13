// Configuração da API
const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api'  // Vercel serverless functions
    : 'http://localhost:3001/api';  // Local development

// Função utilitária para fazer requisições
const apiRequest = async (endpoint, options = {}) => {
    try {
        const url = `${API_BASE_URL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Erro na requisição');
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

    // Verificar saúde da API
    healthCheck: async () => {
        return apiRequest('/health');
    }
};

// Função para verificar se a API está disponível
export const checkAPIAvailable = async () => {
    try {
        await userAPI.healthCheck();
        return true;
    } catch (error) {
        console.warn('API não disponível, usando localStorage como fallback');
        return false;
    }
};