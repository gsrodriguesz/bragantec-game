// Individual user endpoint
import { userController } from '../database.js';

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { playerName } = req.query;

    if (!playerName) {
        return res.status(400).json({ error: 'Nome do jogador é obrigatório' });
    }

    try {
        switch (req.method) {
            case 'GET':
                return handleGetUser(req, res, playerName);
            case 'PUT':
                return handleUpdateUser(req, res, playerName);
            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function handleGetUser(req, res, playerName) {
    try {
        const user = userController.getUser(decodeURIComponent(playerName));

        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

function handleUpdateUser(req, res, playerName) {
    try {
        const result = userController.updateLastActive(decodeURIComponent(playerName));
        return res.status(200).json({
            message: 'Atividade atualizada com sucesso',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}