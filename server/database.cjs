const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Criar/conectar ao banco de dados
const dbPath = path.join(__dirname, 'bragantec.db');
const db = new sqlite3.Database(dbPath);

// Criar tabela de usuários se não existir
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            playerName TEXT UNIQUE NOT NULL,
            playerAvatar TEXT NOT NULL,
            level INTEGER DEFAULT 1,
            totalXp INTEGER DEFAULT 0,
            coins INTEGER DEFAULT 0,
            completedMissions TEXT DEFAULT '[]',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            lastActive DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

// Funções para manipular usuários
const userController = {
    // Criar ou atualizar usuário
    saveUser: (userData, callback) => {
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;
        const missionsJson = JSON.stringify(completedMissions || []);
        
        db.run(`
            INSERT OR REPLACE INTO users 
            (playerName, playerAvatar, level, totalXp, coins, completedMissions, lastActive)
            VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `, [playerName, playerAvatar, level || 1, totalXp || 0, coins || 0, missionsJson], 
        function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: this.lastID, success: true });
            }
        });
    },

    // Buscar todos os usuários
    getAllUsers: (callback) => {
        db.all(`
            SELECT * FROM users 
            ORDER BY totalXp DESC, level DESC
        `, [], (err, rows) => {
            if (err) {
                callback(err, null);
            } else {
                // Converter completedMissions de JSON string para array
                const users = rows.map(user => ({
                    ...user,
                    completedMissions: JSON.parse(user.completedMissions || '[]')
                }));
                callback(null, users);
            }
        });
    },

    // Buscar usuário específico
    getUser: (playerName, callback) => {
        db.get(`
            SELECT * FROM users WHERE playerName = ?
        `, [playerName], (err, row) => {
            if (err) {
                callback(err, null);
            } else if (row) {
                row.completedMissions = JSON.parse(row.completedMissions || '[]');
                callback(null, row);
            } else {
                callback(null, null);
            }
        });
    },

    // Atualizar última atividade
    updateLastActive: (playerName, callback) => {
        db.run(`
            UPDATE users SET lastActive = CURRENT_TIMESTAMP 
            WHERE playerName = ?
        `, [playerName], function(err) {
            callback(err, { success: !err });
        });
    },

    // Limpar todos os dados (para admin)
    clearAllData: (callback) => {
        db.run('DELETE FROM users', [], function(err) {
            callback(err, { success: !err, deletedRows: this.changes });
        });
    }
};

module.exports = { db, userController };