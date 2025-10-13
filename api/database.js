// Database utilities for Vercel serverless functions
import Database from 'better-sqlite3';
import path from 'path';

let db = null;

// Initialize database connection (singleton pattern)
export function getDatabase() {
    if (!db) {
        // For Vercel, we'll use an in-memory database that persists during function execution
        // In production, you might want to use a cloud database like PlanetScale, Supabase, etc.
        db = new Database(':memory:');

        // Create users table
        db.exec(`
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
    }
    return db;
}

// User controller functions
export const userController = {
    // Create or update user
    saveUser: (userData) => {
        const db = getDatabase();
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;
        const missionsJson = JSON.stringify(completedMissions || []);

        try {
            const stmt = db.prepare(`
                INSERT OR REPLACE INTO users 
                (playerName, playerAvatar, level, totalXp, coins, completedMissions, lastActive)
                VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
            `);

            const result = stmt.run(playerName, playerAvatar, level || 1, totalXp || 0, coins || 0, missionsJson);
            return { id: result.lastInsertRowid, success: true };
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    },

    // Get all users
    getAllUsers: () => {
        const db = getDatabase();
        try {
            const stmt = db.prepare('SELECT * FROM users ORDER BY totalXp DESC, level DESC');
            const rows = stmt.all();

            // Convert completedMissions from JSON string to array
            const users = rows.map(user => ({
                ...user,
                completedMissions: JSON.parse(user.completedMissions || '[]')
            }));

            return users;
        } catch (error) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    },

    // Get specific user
    getUser: (playerName) => {
        const db = getDatabase();
        try {
            const stmt = db.prepare('SELECT * FROM users WHERE playerName = ?');
            const row = stmt.get(playerName);

            if (row) {
                row.completedMissions = JSON.parse(row.completedMissions || '[]');
                return row;
            }
            return null;
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    },

    // Update last active
    updateLastActive: (playerName) => {
        const db = getDatabase();
        try {
            const stmt = db.prepare('UPDATE users SET lastActive = CURRENT_TIMESTAMP WHERE playerName = ?');
            const result = stmt.run(playerName);
            return { success: result.changes > 0 };
        } catch (error) {
            throw new Error(`Error updating activity: ${error.message}`);
        }
    },

    // Clear all data
    clearAllData: () => {
        const db = getDatabase();
        try {
            const stmt = db.prepare('DELETE FROM users');
            const result = stmt.run();
            return { success: true, deletedRows: result.changes };
        } catch (error) {
            throw new Error(`Error clearing data: ${error.message}`);
        }
    }
};