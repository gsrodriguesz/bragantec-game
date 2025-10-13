// User activity endpoint
import { userController } from '../../database.js';

export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'PUT') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { playerName } = req.query;

    if (!playerName) {
        return res.status(400).json({ error: 'Nome do jogador é obrigatório' });
    }

    try {
        const result = userController.updateLastActive(decodeURIComponent(playerName));
        return res.status(200).json({
            message: 'Atividade atualizada com sucesso',
            data: result
        });
    } catch (error) {
        console.error('Error updating activity:', error);
        return res.status(500).json({ error: error.message });
    }
}