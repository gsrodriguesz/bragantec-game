import { useEffect, useState } from 'react';
import { useGame } from '../../Components/GameSystem';
import styles from './Homepage.module.css';
import bragantec from '../../assets/svg/bragantec_logo.svg';

export function Homepage() {
    const { visitPage, gameState, setPlayerProfile } = useGame();
    const [showNameInput, setShowNameInput] = useState(false);
    const [tempName, setTempName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('🤖');

    const availableAvatars = [
        '🤖', '😊', '😎', '🥳', '🤓', '😄', '🤗', '🙂',
        '🦸', '🧙', '🐱', '🐶', '🦊', '🐻', '🐼', '🦄',
        '🚀', '⭐', '🌟', '💫', '🎮', '💻', '📱', '🎨'
    ];

    useEffect(() => {
        visitPage('homepage');

        if (!gameState.playerName && !showNameInput) {
            setTimeout(() => setShowNameInput(true), 1000);
        }
    }, []);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (tempName.trim()) {
            setPlayerProfile(tempName.trim(), selectedAvatar);
            setShowNameInput(false);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.hero}>
                    <img src={bragantec} alt="Bragantec Logo" className={styles.logo} />
                    <h1 className={styles.title}>
                        Bem-vindos à 15° Bragantec! 🚀
                    </h1>
                    <p className={styles.subtitle}>
                        {gameState.playerName
                            ? `Olá, ${gameState.playerName}! Escolha uma das opções abaixo para começarmos:`
                            : 'Escolha uma das opções abaixo para começarmos:'
                        }
                    </p>
                </div>

                <div className={styles.cardsContainer}>
                    <a href="/projetos" className={styles.optionCard}>
                        <div className={styles.cardIcon}>💻</div>
                        <h2>Projetos</h2>
                        <p>Explore os projetos incríveis desenvolvidos por nossos alunos!</p>
                        <div className={styles.cardReward}>+100 XP</div>
                    </a>
                    <a href="/curso" className={styles.optionCard}>
                        <div className={styles.cardIcon}>🎓</div>
                        <h2>Curso</h2>
                        <p>Saiba mais sobre o curso oferecido pelo Instituto Federal.</p>
                        <div className={styles.cardReward}>+75 XP</div>
                    </a>
                    <a href="/scratch" className={styles.optionCard}>
                        <div className={styles.cardIcon}>🎮</div>
                        <h2>Scratch</h2>
                        <p>Descubra o mundo da programação com Scratch de forma divertida!</p>
                        <div className={styles.cardReward}>+125 XP</div>
                    </a>
                </div>

                {gameState.level >= 2 && (
                    <div className={styles.achievement}>
                        <h3>🏆 Parabéns!</h3>
                        <p>Você já está no nível {gameState.level}! Continue explorando!</p>
                    </div>
                )}
            </div>

            {/* Modal para criar perfil */}
            {showNameInput && (
                <div className={styles.nameModal}>
                    <div className={styles.modalContainer}>
                        <div className={styles.nameContent}>
                            <div>
                                <div className={styles.mascotWelcome}>🤖</div>
                                <h2>Olá, jovem explorador!</h2>
                                <p>Eu sou o Byte! Vamos criar seu perfil para esta aventura!</p>
                            </div>
                            <div className={styles.formSection}>
                                <form onSubmit={handleProfileSubmit}>
                                    <div className={styles.inputSection}>
                                        <label className={styles.inputLabel}>Seu nome:</label>
                                        <input
                                            type="text"
                                            placeholder="Digite seu nome..."
                                            value={tempName}
                                            onChange={(e) => setTempName(e.target.value)}
                                            className={styles.nameInput}
                                            autoFocus
                                            maxLength={20}
                                        />
                                    </div>

                                    <div className={styles.avatarSection}>
                                        <label className={styles.inputLabel}>Escolha seu avatar:</label>
                                        <div className={styles.avatarGrid}>
                                            {availableAvatars.map((avatar, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={`${styles.avatarOption} ${selectedAvatar === avatar ? styles.selected : ''}`}
                                                    onClick={() => setSelectedAvatar(avatar)}
                                                >
                                                    {avatar}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles.previewSection}>
                                        <p className={styles.previewLabel}>Preview:</p>
                                        <div className={styles.previewCard}>
                                            <div className={styles.previewAvatar}>{selectedAvatar}</div>
                                            <span className={styles.previewName}>
                                                {tempName || 'Seu nome'}
                                            </span>
                                        </div>
                                    </div>


                                    <button type="submit" className={styles.nameSubmit}>
                                        Começar Aventura! 🚀
                                    </button>
                                </form>
                                {/* <button
                                    className={styles.skipButton}
                                    onClick={() => setShowNameInput(false)}
                                >
                                    Pular
                                </button> */}
                            </div>


                        </div>
                    </div>
                </div>
            )}
        </>
    );
}