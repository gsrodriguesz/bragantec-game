import { useEffect } from "react";
import { useGame } from "../../Components/GameSystem";
import { ItemProjeto } from "../../Components/ItemProjeto";
import bolsonaro from "../../assets/img/bolsonaro.jpeg";
import flappy from "../../assets/img/flappy.png";
import dinhero_logo from "../../assets/img/dinhero/logo.png";
import styles from "./Projetos.module.css";

export function Projetos() {
    const { visitPage, addXP, gameState } = useGame();

    useEffect(() => {
        visitPage('projetos');
    }, []);

    const handleProjectClick = () => {
        addXP(25); // Bonus XP por abrir detalhes do projeto
    };

    const projetos = [
        {
            titulo: "DinHero",
            nomesDosIntegrantes: "Gustavo Bettoi, Gustavo Luiz, Eduardo Lopes",
            descricao: "Projeto voltado ao ensino de educação financeira por meio de trilhas personalizadas de estudo",
            descricaoCompleta: "DinHero é uma plataforma educacional inovadora que transforma o aprendizado sobre educação financeira em uma experiência gamificada e personalizada. O projeto oferece trilhas de estudo adaptáveis ao perfil de cada usuário, desde iniciantes até pessoas com conhecimento avançado em finanças. Através de módulos interativos, quizzes e simuladores, os usuários aprendem conceitos fundamentais como orçamento pessoal, investimentos, controle de gastos e planejamento financeiro a longo prazo. A plataforma também inclui ferramentas práticas para acompanhamento de metas financeiras e calculadoras especializadas.",
            caminhoImagem: dinhero_logo,
            imagens: [dinhero_logo, bolsonaro, flappy, dinhero_logo, bolsonaro, flappy, dinhero_logo, bolsonaro, flappy],
            tecnologias: ["React", "Node.js", "MongoDB", "Express", "JWT"]
        },
        {
            titulo: "Flappy Bird Clone",
            nomesDosIntegrantes: "João Silva, Maria Santos",
            descricao: "Recriação do famoso jogo Flappy Bird com melhorias e novos recursos",
            descricaoCompleta: "Uma versão moderna e aprimorada do clássico jogo Flappy Bird, desenvolvida com foco na experiência do usuário e performance otimizada. O jogo mantém a mecânica original simples e viciante, mas adiciona novos elementos como power-ups, diferentes personagens, múltiplos cenários e sistema de conquistas. Inclui também leaderboards online, modo multiplayer local e personalização de skins. O projeto foi desenvolvido utilizando tecnologias web modernas para garantir compatibilidade cross-platform.",
            caminhoImagem: flappy,
            imagens: [flappy, bolsonaro],
            tecnologias: ["JavaScript", "HTML5 Canvas", "CSS3", "Web Audio API"]
        }
    ];

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🚀 Nossos Projetos Incríveis</h1>
                <p>Conheça os projetos desenvolvidos pelos alunos do Instituto Federal!</p>
                {gameState.playerName && (
                    <div className={styles.welcomeMessage}>
                        <span>💡 Olá, {gameState.playerName}! Clique nos projetos para ganhar XP extra!</span>
                    </div>
                )}
            </div>

            <div className={styles.projetos}>
                {projetos.map((projeto, index) => (
                    <div key={index} onClick={handleProjectClick}>
                        <ItemProjeto
                            titulo={projeto.titulo}
                            nomesDosIntegrantes={projeto.nomesDosIntegrantes}
                            descricao={projeto.descricao}
                            descricaoCompleta={projeto.descricaoCompleta}
                            caminhoImagem={projeto.caminhoImagem}
                            imagens={projeto.imagens}
                            tecnologias={projeto.tecnologias}
                        />
                    </div>
                ))}
            </div>

            {gameState.visitedPages.length >= 3 && (
                <div className={styles.congratulations}>
                    <h3>🎉 Parabéns, Explorador!</h3>
                    <p>Você já visitou {gameState.visitedPages.length} seções! Continue explorando!</p>
                </div>
            )}
        </div>
    );
}