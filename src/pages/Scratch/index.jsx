import { useEffect } from "react";
import { useGame } from "../../Components/GameSystem";
import { ItemScratch } from "../../Components/ItemScratch";
import flappy from "../../assets/img/flappy.png";
import styles from "./Scratch.module.css";

export function Scratch() {
    const { visitPage, addXP, gameState } = useGame();

    const handleProjectClick = () => {
        addXP(25);
    };

    useEffect(() => {
        visitPage('scratch');
    }, []);

    const scratchProjects = [
        {
            titulo: "Flappy Bird",
            link: "https://scratch.mit.edu/projects/18262469/editor/",
            descricao: "Recrie o famoso jogo Flappy Bird e aprenda conceitos de programação!",
            caminhoImagem: flappy
        },
        {
            titulo: "Hide & Spooky",
            link: "https://scratch.mit.edu/projects/1223809053/editor/",
            descricao: "Jogo de esconde-esconde com tema de Halloween. Divirta-se enquanto aprende programação!",
            caminhoImagem: flappy
        },
        {
            titulo: "Bowling Blast",
            link: "https://scratch.mit.edu/projects/1205555130/editor/",
            descricao: "Jogo de boliche divertido e interativo.",
            caminhoImagem: flappy
        },
        {
            titulo: "cat jump!",
            link: "https://scratch.mit.edu/projects/1167544034/editor/",
            descricao: "Cat Jump é um jogo simples onde você controla um gato que deve pular sobre obstáculos para ganhar pontos.",
            caminhoImagem: flappy
        },
        {
            titulo: "Pou",
            link: "https://scratch.mit.edu/projects/514497908/editor/",
            descricao: "Minigame do Pou recriado no Scratch",
            caminhoImagem: flappy
        },
        {
            titulo: "Cobrinha",
            link: "https://scratch.mit.edu/projects/1229456681/editor/",
            descricao: "O clássico jogo da cobrinha, onde você controla uma cobra que cresce ao comer frutas.",
            caminhoImagem: flappy
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🎮 Programação com Scratch</h1>
                {gameState.playerName && (
                    <p>Hora de programar, {gameState.playerName}! Vamos criar jogos incríveis!</p>
                )}
                <div className={styles.intro}>
                    <p>O Scratch é uma linguagem de programação visual que torna o aprendizado de programação divertido e acessível para todas as idades!</p>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.infoSection}>
                    <h2>🧩 O que é Scratch?</h2>
                    <p>Scratch é uma plataforma onde você pode criar histórias interativas, jogos e animações usando blocos visuais. É perfeito para iniciantes aprenderem lógica de programação!</p>
                </div>

                <div className={styles.projectsSection}>
                    <h2>🎯 Projetos para Explorar</h2>

                    <div className={styles.projects} onClick={handleProjectClick}>
                        {scratchProjects.map((projeto, index) => (
                            <ItemScratch
                                key={index}
                                titulo={projeto.titulo}
                                link={projeto.link}
                                descricao={projeto.descricao}
                                caminhoImagem={projeto.caminhoImagem}
                            />
                        ))}
                    </div>
                </div>

                <div className={styles.benefitsSection}>
                    <h2>🌟 Por que usar Scratch?</h2>
                    <div className={styles.benefits}>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🎨</span>
                            <h3>Criativo</h3>
                            <p>Desenvolva sua criatividade criando jogos e animações únicas!</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🧠</span>
                            <h3>Educativo</h3>
                            <p>Aprenda lógica de programação de forma visual e intuitiva!</p>
                        </div>
                        <div className={styles.benefit}>
                            <span className={styles.benefitIcon}>🤝</span>
                            <h3>Colaborativo</h3>
                            <p>Compartilhe seus projetos e aprenda com outros programadores!</p>
                        </div>
                    </div>
                </div>

                {gameState.level >= 1 && (
                    <div className={styles.achievement}>
                        <h3>🏆 Programador Iniciante!</h3>
                        <p>Você ganhou +125 XP por explorar o mundo da programação!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
