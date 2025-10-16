import { userController } from '../../database.js';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        await handleUpdateActivity(req, res);
    } catch (error) {
        console.error('API Error:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
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