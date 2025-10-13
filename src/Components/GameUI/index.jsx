import { useState, useEffect } from 'react';
import { useGame } from '../GameSystem';
import styles from './GameUI.module.css';

export function GameUI() {
    const { gameState, missions } = useGame();
    const [showMissions, setShowMissions] = useState(false);
    const [mascotMessage, setMascotMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const mascotMessages = [
        "Olá! Eu sou o Byte! 🤖",
        "Explore todas as seções!",
        "Você está indo muito bem!",
        "Que tal completar mais missões?",
        "A tecnologia é incrível!",
        "Continue explorando! 🚀"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMessage = mascotMessages[Math.floor(Math.random() * mascotMessages.length)];
            setMascotMessage(randomMessage);
            setShowMessage(true);

            setTimeout(() => setShowMessage(false), 3000);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const xpPercentage = (gameState.xp / 300) * 100;
    const activeMissions = missions.filter(m => !gameState.completedMissions.includes(m.id));
    const completedMissions = missions.filter(m => gameState.completedMissions.includes(m.id));

    return (
        <>
            {/* Game Stats UI */}
            <div className={styles.gameUI}>
                <div className={styles.playerInfo}>
                    <div className={styles.avatar}>{gameState.playerAvatar || '🤖'}</div>
                    <div className={styles.playerStats}>
                        <p className={styles.playerName}>
                            {gameState.playerName || 'Explorador'}
                        </p>
                        <p className={styles.level}>Nível {gameState.level}   |   {gameState.xp} XP</p>
                        <div className={styles.xpBar}>
                            <div
                                className={styles.xpFill}
                                style={{ width: `${xpPercentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.coins}>
                    <span>🌻</span>
                    <span>{gameState.coins} coins</span>
                </div>

                <button
                    className={styles.missionButton}
                    onClick={() => setShowMissions(true)}
                >
                    📋 Missões ({activeMissions.length})
                </button>
            </div>

            {/* Mascot */}
            <div className={styles.mascot} onClick={() => setShowMissions(true)}>
                <div className={styles.mascotImage}>🤖</div>
                {showMessage && (
                    <div className={styles.speechBubble}>
                        {mascotMessage}
                    </div>
                )}
            </div>

            {/* Mission Modal */}
            {showMissions && (
                <div className={styles.missionModal} onClick={() => setShowMissions(false)}>
                    <div className={styles.missionContent} onClick={(e) => e.stopPropagation()}>
                        <h2 className={styles.missionTitle}>🎯 Suas Missões</h2>

                        <div className={styles.missionList}>
                            {activeMissions.map(mission => (
                                <div key={mission.id} className={styles.missionItem}>
                                    <div className={styles.missionInfo}>
                                        <h4>{mission.title}</h4>
                                        <p>{mission.description}</p>
                                    </div>
                                    <div className={styles.missionReward}>
                                        +{mission.reward.xp} XP<br />
                                        +{mission.reward.coins} 🪙
                                    </div>
                                </div>
                            ))}

                            {completedMissions.map(mission => (
                                <div key={mission.id} className={`${styles.missionItem} ${styles.completed}`}>
                                    <div className={styles.missionInfo}>
                                        <h4>✅ {mission.title}</h4>
                                        <p>{mission.description}</p>
                                    </div>
                                    <div className={styles.missionReward}>
                                        Completa!
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            className={styles.closeButton}
                            onClick={() => setShowMissions(false)}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}