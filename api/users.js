import { userController } from './database.js';

export default async function handler(req, res) {
    // CORS simplificado para evitar problemas
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
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

    // Validação rigorosa dos dados
    const validation = validateUserData({ playerName, playerAvatar, level, totalXp, coins, completedMissions });
    if (!validation.valid) {
        return res.status(400).json({
            error: 'Dados inválidos',
            details: validation.errors
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

// Função de validação rigorosa
function validateUserData(data) {
    const errors = [];
    const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = data;

    // Validar nome do jogador
    if (!playerName || typeof playerName !== 'string') {
        errors.push('Nome do jogador é obrigatório e deve ser uma string');
    } else if (playerName.length < 2 || playerName.length > 50) {
        errors.push('Nome do jogador deve ter entre 2 e 50 caracteres');
    } else if (!/^[a-zA-ZÀ-ÿ0-9\s\-_.]+$/.test(playerName)) {
        errors.push('Nome do jogador contém caracteres inválidos');
    }

    // Validar avatar
    if (!playerAvatar || typeof playerAvatar !== 'string') {
        errors.push('Avatar é obrigatório e deve ser uma string');
    } else if (playerAvatar.length > 10) {
        errors.push('Avatar deve ter no máximo 10 caracteres');
    }

    // Validar level
    if (level !== undefined) {
        if (typeof level !== 'number' || level < 1 || level > 100 || !Number.isInteger(level)) {
            errors.push('Level deve ser um número inteiro entre 1 e 100');
        }
    }

    // Validar totalXp
    if (totalXp !== undefined) {
        if (typeof totalXp !== 'number' || totalXp < 0 || totalXp > 1000000 || !Number.isInteger(totalXp)) {
            errors.push('Total XP deve ser um número inteiro entre 0 e 1.000.000');
        }
    }

    // Validar coins
    if (coins !== undefined) {
        if (typeof coins !== 'number' || coins < 0 || coins > 100000 || !Number.isInteger(coins)) {
            errors.push('Coins deve ser um número inteiro entre 0 e 100.000');
        }
    }

    // Validar missões completadas
    if (completedMissions !== undefined) {
        if (!Array.isArray(completedMissions)) {
            errors.push('Missões completadas deve ser um array');
        } else if (completedMissions.length > 10) {
            errors.push('Máximo de 10 missões completadas permitidas');
        } else {
            const validMissions = ['welcome', 'explorer', 'student', 'programmer', 'completionist'];
            const invalidMissions = completedMissions.filter(mission =>
                typeof mission !== 'string' || !validMissions.includes(mission)
            );
            if (invalidMissions.length > 0) {
                errors.push('Missões inválidas encontradas');
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}