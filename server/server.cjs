const express = require('express');
const cors = require('cors');
const { userController } = require('./database.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint para salvar/atualizar usuário
app.post('/api/users', (req, res) => {
    const userData = req.body;

    if (!userData.playerName || !userData.playerAvatar) {
        return res.status(400).json({
            error: 'Nome do jogador e avatar são obrigatórios'
        });
    }

    userController.saveUser(userData, (err, result) => {
        if (err) {
            console.error('Erro ao salvar usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json({
                message: 'Usuário salvo com sucesso',
                data: result
            });
        }
    });
});

// Endpoint para buscar todos os usuários
app.get('/api/users', (req, res) => {
    userController.getAllUsers((err, users) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json({
                users: users,
                total: users.length
            });
        }
    });
});

// Endpoint para buscar usuário específico
app.get('/api/users/:playerName', (req, res) => {
    const { playerName } = req.params;

    userController.getUser(playerName, (err, user) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else if (user) {
            res.json({ user });
        } else {
            res.status(404).json({ error: 'Usuário não encontrado' });
        }
    });
});

// Endpoint para atualizar última atividade
app.put('/api/users/:playerName/activity', (req, res) => {
    const { playerName } = req.params;

    userController.updateLastActive(playerName, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar atividade:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json({
                message: 'Atividade atualizada com sucesso',
                data: result
            });
        }
    });
});

// Endpoint para limpar todos os dados (admin)
app.delete('/api/users', (req, res) => {
    userController.clearAllData((err, result) => {
        if (err) {
            console.error('Erro ao limpar dados:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
        } else {
            res.json({
                message: 'Todos os dados foram removidos',
                data: result
            });
        }
    });
});

// Endpoint de saúde
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API Bragantec funcionando',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor API rodando na porta ${PORT}`);
    console.log(`📊 Acesse: http://localhost:${PORT}/api/health`);
});

module.exports = app;