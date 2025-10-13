// Users endpoint - handles all user operations
import { userController } from './database.js';

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        switch (req.method) {
            case 'GET':
                return handleGetUsers(req, res);
            case 'POST':
                return handleCreateUser(req, res);
            case 'DELETE':
                return handleDeleteAllUsers(req, res);
            default:
                return res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function handleGetUsers(req, res) {
    try {
        const users = userController.getAllUsers();
        return res.status(200).json({
            users: users,
            total: users.length
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

function handleCreateUser(req, res) {
    const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = req.body;

    if (!playerName || !playerAvatar) {
        return res.status(400).json({
            error: 'Nome do jogador e avatar são obrigatórios'
        });
    }

    try {
        const result = userController.saveUser({
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

function handleDeleteAllUsers(req, res) {
    try {
        const result = userController.clearAllData();
        return res.status(200).json({
            message: 'Todos os dados foram removidos',
            data: result
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}