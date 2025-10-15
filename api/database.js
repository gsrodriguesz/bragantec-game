import { MongoClient } from 'mongodb';

let client = null;
let db = null;
let useMemoryFallback = false;

let memoryUsers = [];
let nextId = 1;

const memoryUserController = {
    saveUser: async (userData) => {
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;

        const existingIndex = memoryUsers.findIndex(user => user.playerName === playerName);

        const userRecord = {
            _id: existingIndex >= 0 ? memoryUsers[existingIndex]._id : nextId++,
            playerName,
            playerAvatar,
            level: level || 1,
            totalXp: totalXp || 0,
            coins: coins || 0,
            completedMissions: completedMissions || [],
            lastActive: new Date(),
            updatedAt: new Date(),
            createdAt: existingIndex >= 0 ? memoryUsers[existingIndex].createdAt : new Date()
        };

        if (existingIndex >= 0) {
            memoryUsers[existingIndex] = userRecord;
        } else {
            memoryUsers.push(userRecord);
        }

        console.log(`💾 [Memory DB] User saved: ${playerName}`);
        return {
            id: userRecord._id,
            success: true,
            modified: existingIndex >= 0,
            created: existingIndex < 0
        };
    },

    getAllUsers: async () => {
        return memoryUsers
            .slice()
            .sort((a, b) => {
                if (b.totalXp !== a.totalXp) {
                    return b.totalXp - a.totalXp;
                }
                return b.level - a.level;
            });
    },

    getUser: async (playerName) => {
        return memoryUsers.find(user => user.playerName === playerName) || null;
    },

    updateLastActive: async (playerName) => {
        const userIndex = memoryUsers.findIndex(user => user.playerName === playerName);
        if (userIndex >= 0) {
            memoryUsers[userIndex].lastActive = new Date();
            memoryUsers[userIndex].updatedAt = new Date();
            return { success: true };
        }
        return { success: false };
    },

    clearAllData: async () => {
        const deletedCount = memoryUsers.length;
        memoryUsers.length = 0;
        nextId = 1;
        console.log(`🗑️ [Memory DB] Cleared ${deletedCount} users`);
        return { success: true, deletedRows: deletedCount };
    }
};

async function getDatabase() {
    if (useMemoryFallback) {
        return null;
    }

    if (!client) {
        const uri = process.env.MONGODB_URI;

        if (!uri) {
            console.log('⚠️ MongoDB URI não configurado, usando fallback em memória');
            useMemoryFallback = true;
            return null;
        }

        try {
            client = new MongoClient(uri);
            await client.connect();
            console.log('✅ Connected to MongoDB:', uri.includes('localhost') ? 'Local' : 'Atlas');
        } catch (error) {
            console.log('⚠️ Falha ao conectar MongoDB, usando fallback em memória:', error.message);
            useMemoryFallback = true;
            return null;
        }
    }

    if (!db) {
        db = client.db(process.env.MONGODB_DATABASE || 'bragantec');
    }

    return db;
}

export const userController = {
    saveUser: async (userData) => {
        try {
            const db = await getDatabase();

            if (!db) {
                return await memoryUserController.saveUser(userData);
            }

            const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;
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

            if (!db) {
                return await memoryUserController.getAllUsers();
            }

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

            if (!db) {
                return await memoryUserController.getUser(playerName);
            }

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

            if (!db) {
                return await memoryUserController.updateLastActive(playerName);
            }

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

            if (!db) {
                return await memoryUserController.clearAllData();
            }

            const collection = db.collection('users');
            const result = await collection.deleteMany({});
            return { success: true, deletedRows: result.deletedCount };
        } catch (error) {
            throw new Error(`Error clearing data: ${error.message}`);
        }
    }
};