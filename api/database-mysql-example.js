// Alternative database configuration using PlanetScale (MySQL)
// Uncomment and configure if you want persistent data storage

/*
import mysql from 'mysql2/promise';

const dbConfig = {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
        rejectUnauthorized: true
    }
};

let connection = null;

export async function getConnection() {
    if (!connection) {
        connection = await mysql.createConnection(dbConfig);

        // Create users table if it doesn't exist
        await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                playerName VARCHAR(255) UNIQUE NOT NULL,
                playerAvatar VARCHAR(255) NOT NULL,
                level INT DEFAULT 1,
                totalXp INT DEFAULT 0,
                coins INT DEFAULT 0,
                completedMissions JSON,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                lastActive TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
    }
    return connection;
}

export const userController = {
    saveUser: async (userData) => {
        const conn = await getConnection();
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;

        const [result] = await conn.execute(`
            INSERT INTO users (playerName, playerAvatar, level, totalXp, coins, completedMissions)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
            playerAvatar = VALUES(playerAvatar),
            level = VALUES(level),
            totalXp = VALUES(totalXp),
            coins = VALUES(coins),
            completedMissions = VALUES(completedMissions),
            lastActive = CURRENT_TIMESTAMP
        `, [playerName, playerAvatar, level || 1, totalXp || 0, coins || 0, JSON.stringify(completedMissions || [])]);

        return { id: result.insertId, success: true };
    },

    getAllUsers: async () => {
        const conn = await getConnection();
        const [rows] = await conn.execute('SELECT * FROM users ORDER BY totalXp DESC, level DESC');

        return rows.map(user => ({
            ...user,
            completedMissions: JSON.parse(user.completedMissions || '[]')
        }));
    },

    getUser: async (playerName) => {
        const conn = await getConnection();
        const [rows] = await conn.execute('SELECT * FROM users WHERE playerName = ?', [playerName]);

        if (rows.length > 0) {
            const user = rows[0];
            user.completedMissions = JSON.parse(user.completedMissions || '[]');
            return user;
        }
        return null;
    },

    updateLastActive: async (playerName) => {
        const conn = await getConnection();
        const [result] = await conn.execute(
            'UPDATE users SET lastActive = CURRENT_TIMESTAMP WHERE playerName = ?',
            [playerName]
        );
        return { success: result.affectedRows > 0 };
    },

    clearAllData: async () => {
        const conn = await getConnection();
        const [result] = await conn.execute('DELETE FROM users');
        return { success: true, deletedRows: result.affectedRows };
    }
};
*/

// Instructions for setup:
// 1. Create a PlanetScale database
// 2. Add environment variables to Vercel:
//    - DATABASE_HOST
//    - DATABASE_USERNAME
//    - DATABASE_PASSWORD
//    - DATABASE_NAME
// 3. Install mysql2: npm install mysql2
// 4. Replace the import in api/database.js
// 5. Uncomment the code above