import { MongoClient } from 'mongodb';
import { memoryUserController } from './database-memory.js';

let client = null;
let db = null;
let useMemoryFallback = false;

async function getDatabase() {
    if (!client) {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

        if (!uri || uri === 'mongodb://localhost:27017') {
            throw new Error(`
❌ MongoDB não configurado!

Para desenvolvimento local:
1. Instale MongoDB Community Server
2. Configure MONGODB_URI=mongodb://localhost:27017 no .env.local

Para MongoDB Atlas:
1. Crie conta em https://cloud.mongodb.com/
2. Configure MONGODB_URI com sua connection string
3. Configure MONGODB_DATABASE=bragantec

Arquivo .env.local deve conter:
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=bragantec
            `);
        }

        client = new MongoClient(uri);
        await client.connect();
        console.log('✅ Connected to MongoDB:', uri.includes('localhost') ? 'Local' : 'Atlas');
    }

    if (!db) {
        db = client.db(process.env.MONGODB_DATABASE || 'bragantec');
    }

    return db;
}

export const userController = {
    saveUser: async (userData) => {
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;

        try {
            const db = await getDatabase();
            const collection = db.collection('users');

            const userRecord = {
                playerName,
                playerAvatar,
                level: level || 1,
                totalXp: totalXp || 0,
                coins: coins || 0,
                completedMissions: completedMissions || [],
                lastActive: new Date(),
                updatedAt: new Date()
            };

            const result = await collection.updateOne(
                { playerName: playerName },
                {
                    $set: userRecord,
                    $setOnInsert: { createdAt: new Date() }
                },
                { upsert: true }
            );

            return {
                id: result.upsertedId || playerName,
                success: true,
                modified: result.modifiedCount > 0,
                created: result.upsertedCount > 0
            };
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    },
    getAllUsers: async () => {
        try {
            const db = await getDatabase();
            const collection = db.collection('users');

            const users = await collection
                .find({})
                .sort({ totalXp: -1, level: -1 })
                .toArray();

            return users;
        } catch (error) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    },

    getUser: async (playerName) => {
        try {
            const db = await getDatabase();
            const collection = db.collection('users');

            const user = await collection.findOne({ playerName: playerName });
            return user;
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    },

    updateLastActive: async (playerName) => {
        try {
            const db = await getDatabase();
            const collection = db.collection('users');

            const result = await collection.updateOne(
                { playerName: playerName },
                {
                    $set: {
                        lastActive: new Date(),
                        updatedAt: new Date()
                    }
                }
            );

            return { success: result.modifiedCount > 0 };
        } catch (error) {
            throw new Error(`Error updating activity: ${error.message}`);
        }
    },

    clearAllData: async () => {
        try {
            const db = await getDatabase();
            const collection = db.collection('users');

            const result = await collection.deleteMany({});
            return { success: true, deletedRows: result.deletedCount };
        } catch (error) {
            throw new Error(`Error clearing data: ${error.message}`);
        }
    }
};