import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';
import { userAPI, checkAPIAvailable } from '../../services/api';

export function AdminPanel() {
    const [users, setUsers] = useState([]);
    const [sortBy, setSortBy] = useState('totalXp');
    const [sortOrder, setSortOrder] = useState('desc');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [showSimulatedData, setShowSimulatedData] = useState(false);
    const [apiAvailable, setApiAvailable] = useState(false);

    // Senha simples para acesso admin (em produção seria mais seguro)
    const ADMIN_PASSWORD = 'bragantec2025';

    useEffect(() => {
        // Verificar disponibilidade da API
        checkAPIAvailable().then(available => {
            setApiAvailable(available);
        });
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            loadAllUsers();
        }
    }, [isAuthenticated, showSimulatedData, apiAvailable]);

    // Gerador de dados simulados realistas
    const generateSimulatedUsers = () => {
        const nomes = [
            'Ana Silva', 'Pedro Santos', 'Maria Costa', 'João Oliveira', 'Carla Ferreira',
            'Lucas Pereira', 'Beatriz Lima', 'Rafael Rodrigues', 'Juliana Alves', 'Marcos Souza',
            'Gabriela Martins', 'Diego Barbosa', 'Larissa Nascimento', 'Bruno Dias', 'Amanda Castro',
            'Gustavo Rocha', 'Fernanda Gomes', 'Thiago Cardoso', 'Camila Ribeiro', 'Victor Azevedo',
            'Sophia Mendes', 'Felipe Araújo', 'Isabella Freitas', 'Enzo Machado', 'Manuela Vieira',
            'Arthur Cavalcanti', 'Yasmin Cunha', 'Gabriel Melo', 'Lara Monteiro', 'Miguel Teixeira'
        ];

        const avatars = [
            '🤖', '😊', '😎', '🥳', '🤓', '😄', '🤗', '🙂', '🦸', '🧙',
            '🐱', '🐶', '🦊', '🐻', '🐼', '🦄', '🚀', '⭐', '🌟', '💫',
            '🎮', '💻', '📱', '🎨', '🎯', '🎪', '🎭', '🎪', '🎨', '🎵'
        ];

        const escolas = [
            'IFSP - São Paulo', 'IFSP - Campinas', 'IFSP - Santos', 'IFSP - Guarulhos',
            'IFSP - São José dos Campos', 'IFSP - Sorocaba', 'IFSP - Piracicaba',
            'IFSP - Bragança Paulista', 'IFSP - Capivari', 'IFSP - Itapetininga'
        ];

        const dispositivos = [
            'Windows - Chrome', 'Windows - Edge', 'Mac - Safari', 'Mac - Chrome',
            'Android - Chrome', 'iPhone - Safari', 'Linux - Firefox', 'iPad - Safari'
        ];

        return nomes.map((nome, index) => {
            const randomLevel = Math.floor(Math.random() * 8) + 1;
            const randomXP = randomLevel * 300 + Math.floor(Math.random() * 250);
            const randomCoins = Math.floor(randomXP * 0.2) + Math.floor(Math.random() * 50);

            // Simular atividade mais recente para alguns usuários
            const activityVariations = [
                Math.floor(Math.random() * 3600000), // Últimas 1 hora
                Math.floor(Math.random() * 86400000), // Últimas 24 horas
                Math.floor(Math.random() * 172800000), // Últimos 2 dias
                Math.floor(Math.random() * 604800000), // Última semana
                Math.floor(Math.random() * 2592000000) // Último mês
            ];

            const missionsCount = Math.min(randomLevel, 5);
            const allMissions = ['welcome', 'explorer', 'student', 'programmer', 'completionist'];
            const completedMissions = allMissions.slice(0, missionsCount);

            const possiblePages = ['homepage', 'projetos', 'curso', 'scratch'];
            const visitedPagesCount = Math.min(randomLevel + 1, 4);
            const visitedPages = possiblePages.slice(0, visitedPagesCount);

            return {
                id: index + 1000,
                playerName: nome,
                playerAvatar: avatars[index % avatars.length],
                level: randomLevel,
                totalXp: randomXP,
                xp: randomXP % 300,
                coins: randomCoins,
                completedMissions,
                visitedPages,
                unlockedBadges: [],
                lastActive: new Date(Date.now() - activityVariations[index % activityVariations.length]).toISOString(),
                // Dados extras para simulação
                escola: escolas[index % escolas.length],
                dispositivo: dispositivos[index % dispositivos.length],
                sessoes: Math.floor(Math.random() * 20) + 1,
                tempoTotal: Math.floor(Math.random() * 7200) + 300 // 5min a 2h em segundos
            };
        });
    };

    const loadAllUsers = async () => {
        let usersArray = [];

        if (showSimulatedData) {
            // Mostrar dados simulados
            usersArray = generateSimulatedUsers();
        } else if (apiAvailable) {
            // Buscar dados reais da API
            try {
                const response = await userAPI.getAllUsers();
                usersArray = response.users.map(user => ({
                    ...user,
                    school: 'Bragantec Online',
                    device: 'Sistema Web'
                }));
                console.log(`📊 ${usersArray.length} usuários carregados da API`);
            } catch (error) {
                console.error('Erro ao carregar usuários da API:', error);
                // Fallback para localStorage
                loadUsersFromLocalStorage();
                return;
            }
        } else {
            // Fallback: dados do localStorage
            loadUsersFromLocalStorage();
            return;
        }

        setUsers(usersArray);
    };

    const loadUsersFromLocalStorage = () => {
        let usersArray = [];
        const currentUser = localStorage.getItem('bragantec-game');
        const allUsersData = localStorage.getItem('bragantec-all-users');

        if (allUsersData) {
            usersArray = JSON.parse(allUsersData);
        }

        if (currentUser) {
            const current = JSON.parse(currentUser);
            if (current.playerName) {
                const existingIndex = usersArray.findIndex(user =>
                    user.playerName === current.playerName
                );

                if (existingIndex >= 0) {
                    usersArray[existingIndex] = {
                        ...current,
                        lastActive: new Date().toISOString(),
                        id: 'current-user',
                        school: 'Escola Local',
                        device: 'Computador Atual'
                    };
                } else {
                    usersArray.push({
                        id: 'current-user',
                        ...current,
                        lastActive: new Date().toISOString(),
                        school: 'Escola Local',
                        device: 'Computador Atual'
                    });
                }
            }
        }

        setUsers(usersArray);
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
        } else {
            alert('Senha incorreta!');
        }
    };

    const sortUsers = (users) => {
        return [...users].sort((a, b) => {
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (sortBy === 'lastActive') {
                aValue = new Date(aValue).getTime();
                bValue = new Date(bValue).getTime();
            }

            if (sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    };

    const filteredUsers = users.filter(user =>
        user.playerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedUsers = sortUsers(filteredUsers);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins}min atrás`;
        } else if (diffHours < 24) {
            return `${diffHours}h atrás`;
        } else {
            return `${diffDays}d atrás`;
        }
    };

    const clearAllData = async () => {
        if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
            // Limpar dados da API se disponível
            if (apiAvailable) {
                try {
                    await userAPI.clearAllData();
                    console.log('🗑️ Dados do banco removidos');
                } catch (error) {
                    console.error('Erro ao limpar dados da API:', error);
                }
            }

            // Limpar dados locais
            localStorage.removeItem('bragantec-all-users');
            localStorage.removeItem('bragantec-game');
            setUsers([]);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <h2>🔐 Gestor de Usuários</h2>
                    <p>Digite a senha para acessar o gestor de usuários:</p>
                    <form onSubmit={handleAuth}>
                        <input
                            type="password"
                            placeholder="Senha de administrador"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.passwordInput}
                            autoFocus
                        />
                        <button type="submit" className={styles.authButton}>
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>👮‍♂️ Gestor de Usuários</h1>
                <p>Gerencie e visualize os dados dos usuários do sistema de gamificação</p>
                <div className={styles.dataSource}>
                    {showSimulatedData ? (
                        <span className={styles.simulatedBadge}>🌐 Dados Simulados</span>
                    ) : apiAvailable ? (
                        <span className={styles.apiBadge}>💾 Banco de Dados</span>
                    ) : (
                        <span className={styles.localBadge}>📱 Dados Locais</span>
                    )}
                </div>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchSection}>
                    <input
                        type="text"
                        placeholder="🔍 Buscar usuário..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.statsSection}>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>{users.length}</span>
                        <span className={styles.statLabel}>Total de Usuários</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>
                            {users.reduce((sum, user) => sum + user.totalXp, 0)}
                        </span>
                        <span className={styles.statLabel}>XP Total</span>
                    </div>
                    <div className={styles.statCard}>
                        <span className={styles.statNumber}>
                            {users.reduce((sum, user) => sum + user.coins, 0)}
                        </span>
                        <span className={styles.statLabel}>Coins Total</span>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <div className={styles.toggleSection}>
                        <label className={styles.toggleLabel}>
                            <input
                                type="checkbox"
                                checked={showSimulatedData}
                                onChange={(e) => setShowSimulatedData(e.target.checked)}
                                className={styles.toggleInput}
                            />
                            <span className={styles.toggleSlider}></span>
                            <span className={styles.toggleText}>
                                {showSimulatedData ? '🌐 Dados Simulados' : '💾 Dados Reais'}
                            </span>
                        </label>
                    </div>
                    <button onClick={loadAllUsers} className={styles.refreshButton}>
                        🔄 Atualizar
                    </button>
                    <button onClick={clearAllData} className={styles.clearButton}>
                        🗑️ Limpar Dados
                    </button>
                </div>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.usersTable}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('playerName')} className={styles.sortable}>
                                👤 Nome
                                {sortBy === 'playerName' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('level')} className={styles.sortable}>
                                📊 Nível
                                {sortBy === 'level' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('totalXp')} className={styles.sortable}>
                                ⭐ XP Total
                                {sortBy === 'totalXp' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('coins')} className={styles.sortable}>
                                🪙 Coins
                                {sortBy === 'coins' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th>🎯 Missões</th>
                            <th onClick={() => handleSort('school')} className={styles.sortable}>
                                🏫 Escola
                                {sortBy === 'school' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('device')} className={styles.sortable}>
                                💻 Dispositivo
                                {sortBy === 'device' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                            <th onClick={() => handleSort('lastActive')} className={styles.sortable}>
                                🕒 Última Atividade
                                {sortBy === 'lastActive' && (
                                    <span className={styles.sortIcon}>
                                        {sortOrder === 'asc' ? '↑' : '↓'}
                                    </span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedUsers.map((user) => (
                            <tr key={user.id} className={styles.userRow}>
                                <td className={styles.nameCell}>
                                    <div className={styles.userInfo}>
                                        <span className={styles.avatar}>{user.playerAvatar}</span>
                                        <span className={styles.name}>{user.playerName}</span>
                                    </div>
                                </td>
                                <td className={styles.levelCell}>
                                    <span className={styles.levelBadge}>Nv. {user.level}</span>
                                </td>
                                <td className={styles.xpCell}>{user.totalXp}</td>
                                <td className={styles.coinsCell}>{user.coins}</td>
                                <td className={styles.missionsCell}>
                                    <span className={styles.missionProgress}>
                                        {user.completedMissions.length}/5
                                    </span>
                                    <div className={styles.missionBar}>
                                        <div
                                            className={styles.missionFill}
                                            style={{ width: `${(user.completedMissions.length / 5) * 100}%` }}
                                        />
                                    </div>
                                </td>
                                <td className={styles.schoolCell}>
                                    <span className={styles.schoolName}>{user.school || 'N/A'}</span>
                                </td>
                                <td className={styles.deviceCell}>
                                    <span className={styles.deviceName}>{user.device || 'N/A'}</span>
                                </td>
                                <td className={styles.activityCell}>
                                    {formatDate(user.lastActive)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {sortedUsers.length === 0 && (
                <div className={styles.emptyState}>
                    <p>📭 Nenhum usuário encontrado</p>
                </div>
            )}
        </div>
    );
}