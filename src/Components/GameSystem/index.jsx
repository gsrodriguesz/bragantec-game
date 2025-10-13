import { createContext, useContext, useState, useEffect } from 'react';
import { userAPI, checkAPIAvailable } from '../../services/api';

const GameContext = createContext();

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame deve ser usado dentro de GameProvider');
    }
    return context;
}

export function GameProvider({ children }) {
    const [apiAvailable, setApiAvailable] = useState(false);
    const [gameState, setGameState] = useState(() => {
        const saved = localStorage.getItem('bragantec-game');
        return saved ? JSON.parse(saved) : {
            playerName: '',
            playerAvatar: '🤖',
            level: 1,
            xp: 0,
            totalXp: 0,
            coins: 0,
            visitedPages: [],
            completedMissions: [],
            unlockedBadges: [],
            currentMission: null
        };
    });

    const missions = [
        {
            id: 'welcome',
            title: 'Bem-vindo à Bragantec!',
            description: 'Explore a página inicial e conheça o evento',
            reward: { xp: 50, coins: 10 },
            completed: false,
            action: 'visit_homepage'
        },
        {
            id: 'explorer',
            title: 'Explorador de Projetos',
            description: 'Visite a seção de projetos e abra um projeto',
            reward: { xp: 100, coins: 20 },
            completed: false,
            action: 'visit_projetos'
        },
        {
            id: 'student',
            title: 'Futuro Estudante',
            description: 'Descubra mais sobre o curso',
            reward: { xp: 75, coins: 15 },
            completed: false,
            action: 'visit_curso'
        },
        {
            id: 'programmer',
            title: 'Programador Iniciante',
            description: 'Explore o mundo do Scratch',
            reward: { xp: 125, coins: 25 },
            completed: false,
            action: 'visit_scratch'
        },
        {
            id: 'completionist',
            title: 'Explorador Completo',
            description: 'Visite todas as seções do site',
            reward: { xp: 200, coins: 50 },
            completed: false,
            action: 'visit_all_pages'
        }
    ];

    const badges = [
        { id: 'first_visit', name: 'Primeira Visita', icon: '🎉', description: 'Bem-vindo!' },
        { id: 'project_viewer', name: 'Visualizador', icon: '👀', description: 'Visualizou um projeto' },
        { id: 'curious', name: 'Curioso', icon: '🔍', description: 'Explorou 3 seções' },
        { id: 'scholar', name: 'Estudioso', icon: '🎓', description: 'Completou todas as missões' },
        { id: 'level_5', name: 'Nível 5', icon: '⭐', description: 'Chegou ao nível 5' }
    ];

    // Verificar disponibilidade da API ao carregar
    useEffect(() => {
        checkAPIAvailable().then(available => {
            setApiAvailable(available);
            if (available) {
                console.log('✅ API conectada - dados serão salvos no banco');
            } else {
                console.log('⚠️ API indisponível - usando localStorage');
            }
        });
    }, []);

    // Salvar dados sempre que o estado mudar
    useEffect(() => {
        // Sempre salvar no localStorage (backup)
        localStorage.setItem('bragantec-game', JSON.stringify(gameState));

        // Se API estiver disponível e player tiver nome, salvar no banco
        if (apiAvailable && gameState.playerName) {
            saveToDatabase(gameState);
        }

        // Salvar na lista local para compatibilidade
        if (gameState.playerName) {
            saveToAllUsers(gameState);
        }
    }, [gameState, apiAvailable]);

    // Função para salvar no banco de dados via API
    const saveToDatabase = async (currentGameState) => {
        try {
            await userAPI.saveUser({
                playerName: currentGameState.playerName,
                playerAvatar: currentGameState.playerAvatar,
                level: currentGameState.level,
                totalXp: currentGameState.totalXp,
                coins: currentGameState.coins,
                completedMissions: currentGameState.completedMissions
            });
            console.log('💾 Dados salvos no banco de dados');
        } catch (error) {
            console.error('Erro ao salvar no banco:', error);
            // Se falhar, marcar API como indisponível
            setApiAvailable(false);
        }
    };

    const saveToAllUsers = (currentGameState) => {
        const allUsersData = localStorage.getItem('bragantec-all-users');
        let allUsers = allUsersData ? JSON.parse(allUsersData) : [];

        // Encontrar usuário existente ou criar novo
        const existingUserIndex = allUsers.findIndex(user =>
            user.playerName === currentGameState.playerName &&
            user.playerAvatar === currentGameState.playerAvatar
        );

        const userData = {
            id: existingUserIndex >= 0 ? allUsers[existingUserIndex].id : Date.now(),
            ...currentGameState,
            lastActive: new Date().toISOString()
        };

        if (existingUserIndex >= 0) {
            allUsers[existingUserIndex] = userData;
        } else {
            allUsers.push(userData);
        }

        localStorage.setItem('bragantec-all-users', JSON.stringify(allUsers));
    };

    const addXP = (amount) => {
        setGameState(prev => {
            const newXp = prev.xp + amount;
            const newTotalXp = prev.totalXp + amount;
            const newLevel = Math.floor(newTotalXp / 300) + 1; // Cada 300 XP = 1 level

            return {
                ...prev,
                xp: newXp >= 300 ? newXp - 300 : newXp,
                totalXp: newTotalXp,
                level: newLevel
            };
        });
    };

    const addCoins = (amount) => {
        setGameState(prev => ({
            ...prev,
            coins: prev.coins + amount
        }));
    };

    const visitPage = (pageName) => {
        setGameState(prev => {
            const alreadyVisited = prev.visitedPages.includes(pageName);
            const newVisitedPages = alreadyVisited
                ? prev.visitedPages
                : [...prev.visitedPages, pageName];

            // Verificar missões
            const updatedMissions = [...prev.completedMissions];
            let xpGained = 0;
            let coinsGained = 0;

            missions.forEach(mission => {
                if (!prev.completedMissions.includes(mission.id)) {
                    let shouldComplete = false;

                    switch (mission.action) {
                        case 'visit_homepage':
                            shouldComplete = pageName === 'homepage';
                            break;
                        case 'visit_projetos':
                            shouldComplete = pageName === 'projetos';
                            break;
                        case 'visit_curso':
                            shouldComplete = pageName === 'curso';
                            break;
                        case 'visit_scratch':
                            shouldComplete = pageName === 'scratch';
                            break;
                        case 'visit_all_pages':
                            shouldComplete = newVisitedPages.length >= 4;
                            break;
                    }

                    if (shouldComplete) {
                        updatedMissions.push(mission.id);
                        xpGained += mission.reward.xp;
                        coinsGained += mission.reward.coins;
                    }
                }
            });

            return {
                ...prev,
                visitedPages: newVisitedPages,
                completedMissions: updatedMissions,
                xp: prev.xp + xpGained,
                totalXp: prev.totalXp + xpGained,
                coins: prev.coins + coinsGained,
                level: Math.floor((prev.totalXp + xpGained) / 300) + 1
            };
        });
    };

    const unlockBadge = (badgeId) => {
        setGameState(prev => {
            if (prev.unlockedBadges.includes(badgeId)) return prev;

            return {
                ...prev,
                unlockedBadges: [...prev.unlockedBadges, badgeId]
            };
        });
    };

    const setPlayerName = (name) => {
        setGameState(prev => ({
            ...prev,
            playerName: name
        }));
    };

    const setPlayerAvatar = (avatar) => {
        setGameState(prev => ({
            ...prev,
            playerAvatar: avatar
        }));
    };

    const setPlayerProfile = async (name, avatar) => {
        // Se API estiver disponível, tentar buscar dados existentes
        if (apiAvailable) {
            try {
                const response = await userAPI.getUser(name);
                if (response.user) {
                    // Usuário já existe no banco, carregar seus dados
                    setGameState(prev => ({
                        ...prev,
                        playerName: response.user.playerName,
                        playerAvatar: response.user.playerAvatar,
                        level: response.user.level,
                        totalXp: response.user.totalXp,
                        coins: response.user.coins,
                        completedMissions: response.user.completedMissions || []
                    }));
                    console.log('👤 Dados do usuário carregados do banco');
                    return;
                }
            } catch (error) {
                console.log('Usuário não encontrado no banco, criando novo perfil');
            }
        }

        // Criar novo perfil ou usar dados locais
        setGameState(prev => ({
            ...prev,
            playerName: name,
            playerAvatar: avatar
        }));
    };

    return (
        <GameContext.Provider value={{
            gameState,
            missions,
            badges,
            addXP,
            addCoins,
            visitPage,
            unlockBadge,
            setPlayerName,
            setPlayerAvatar,
            setPlayerProfile
        }}>
            {children}
        </GameContext.Provider>
    );
}