// Simple in-memory database for Vercel serverless functions
// This avoids native dependencies issues with better-sqlite3

let users = [];
let nextId = 1;

// User controller functions using simple in-memory storage
export const userController = {
    // Create or update user
    saveUser: (userData) => {
        const { playerName, playerAvatar, level, totalXp, coins, completedMissions } = userData;

        try {
            // Find existing user
            const existingIndex = users.findIndex(user => user.playerName === playerName);

            const userRecord = {
                playerName,
                playerAvatar,
                level: level || 1,
                totalXp: totalXp || 0,
                coins: coins || 0,
                completedMissions: completedMissions || [],
                lastActive: new Date().toISOString(),
                createdAt: new Date().toISOString()
            };

            if (existingIndex >= 0) {
                // Update existing user
                userRecord.id = users[existingIndex].id;
                userRecord.createdAt = users[existingIndex].createdAt;
                users[existingIndex] = userRecord;
                return { id: userRecord.id, success: true };
            } else {
                // Create new user
                userRecord.id = nextId++;
                users.push(userRecord);
                return { id: userRecord.id, success: true };
            }
        } catch (error) {
            throw new Error(`Error saving user: ${error.message}`);
        }
    },

    // Get all users
    getAllUsers: () => {
        try {
            // Sort by totalXp desc, then by level desc
            return users
                .slice()
                .sort((a, b) => {
                    if (b.totalXp !== a.totalXp) {
                        return b.totalXp - a.totalXp;
                    }
                    return b.level - a.level;
                });
        } catch (error) {
            throw new Error(`Error getting users: ${error.message}`);
        }
    },

    // Get specific user
    getUser: (playerName) => {
        try {
            const user = users.find(user => user.playerName === playerName);
            return user || null;
        } catch (error) {
            throw new Error(`Error getting user: ${error.message}`);
        }
    },

    // Update last active
    updateLastActive: (playerName) => {
        try {
            const userIndex = users.findIndex(user => user.playerName === playerName);
            if (userIndex >= 0) {
                users[userIndex].lastActive = new Date().toISOString();
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            throw new Error(`Error updating activity: ${error.message}`);
        }
    },

    // Clear all data
    clearAllData: () => {
        try {
            const deletedCount = users.length;
            users.length = 0; // Clear array
            nextId = 1; // Reset ID counter
            return { success: true, deletedRows: deletedCount };
        } catch (error) {
            throw new Error(`Error clearing data: ${error.message}`);
        }
    }
};