import { userController } from '../database.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        await handleRequest(req, res);
    } catch (error) {
        console.error('API Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

async function handleRequest(req, res) {

    const { playerName } = req.query;

    if (!playerName) {
        return res.status(400).json({ error: 'Nome do jogador é obrigatório' });
    }

    // Validar nome do jogador
    if (typeof playerName !== 'string' || !/^[a-zA-ZÀ-ÿ0-9\s\-_.]+$/.test(decodeURIComponent(playerName))) {
        return res.status(400).json({ error: 'Nome do jogador inválido' });
    }

    switch (req.method) {
        case 'GET':
            return await handleGetUser(req, res, playerName);
        case 'PUT':
            return await handleUpdateUser(req, res, playerName);
        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}

async function handleGetUser(req, res, playerName) {
    try {
        const user = await userController.getUser(decodeURIComponent(playerName));

        if (user) {
            return res.status(200).json({ user });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
} async function handleUpdateUser(req, res, playerName) {
    try {
        const result = await userController.updateLastActive(decodeURIComponent(playerName));
        return res.status(200).json({
            message: 'Atividade atualizada com sucesso',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}