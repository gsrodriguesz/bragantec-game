import { userController } from './database.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        switch (req.method) {
            case 'GET':
                return await handleGetUsers(req, res);
            case 'POST':
                return await handleCreateUser(req, res);
            case 'DELETE':
                return await handleDeleteAllUsers(req, res);
            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

async function handleGetUsers(req, res) {
    try {
        const users = await userController.getAllUsers();
        return res.status(200).json({
            users: users,
            total: users.length
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function handleCreateUser(req, res) {
    const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = req.body;

    if (!playerName || !playerAvatar) {
        return res.status(400).json({
            error: 'Nome do jogador e avatar são obrigatórios'
        });
    }

    try {
        const result = await userController.saveUser({
            playerName,
            playerAvatar,
            level,
            totalXp,
            coins,
            completedMissions
        });

        return res.status(200).json({
            message: 'Usuário salvo com sucesso',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

async function handleDeleteAllUsers(req, res) {
    try {
        const result = await userController.clearAllData();
        return res.status(200).json({
            message: 'Todos os dados foram removidos',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}