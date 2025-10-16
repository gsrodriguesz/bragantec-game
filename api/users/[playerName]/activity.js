import { userController } from '../../database.js';
import { securityMiddleware } from '../../middleware/security.js';

export default async function handler(req, res) {
    // Configurar CORS mais restritivo
    const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',');
    const origin = req.headers.origin;

    if (origin && allowedOrigins.some(allowed => origin.startsWith(allowed.trim()))) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key, x-api-timestamp');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Aplicar middleware de segurança
    return new Promise((resolve) => {
        securityMiddleware(req, res, async () => {
            try {
                await handleUpdateActivity(req, res);
                resolve();
            } catch (error) {
                console.error('API Error:', error);
                res.status(500).json({ error: 'Internal server error' });
                resolve();
            }
        });
    });
}

async function handleUpdateActivity(req, res) {

    const { playerName } = req.query;

    if (!playerName) {
        return res.status(400).json({ error: 'Nome do jogador é obrigatório' });
    }

    // Validar nome do jogador
    if (typeof playerName !== 'string' || !/^[a-zA-ZÀ-ÿ0-9\s\-_.]+$/.test(decodeURIComponent(playerName))) {
        return res.status(400).json({ error: 'Nome do jogador inválido' });
    }

    try {
        const result = await userController.updateLastActive(decodeURIComponent(playerName));
        return res.status(200).json({
            message: 'Atividade atualizada com sucesso',
            data: result
        });
    } catch (error) {
        console.error('Error updating activity:', error);
        return res.status(500).json({ error: error.message });
    }
}