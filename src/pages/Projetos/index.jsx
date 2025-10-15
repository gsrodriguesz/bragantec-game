import { useEffect } from "react";
import { useGame } from "../../Components/GameSystem";
import { ItemProjeto } from "../../Components/ItemProjeto";
import styles from "./Projetos.module.css";


// Dinhero imports
import dinhero_logo from "../../assets/img/dinhero/logo.png";
import dinhero_0 from "../../assets/img/dinhero/0.png";
import dinhero_1 from "../../assets/img/dinhero/1.png";
import dinhero_2 from "../../assets/img/dinhero/2.png";
import dinhero_3 from "../../assets/img/dinhero/3.png";
import dinhero_4 from "../../assets/img/dinhero/4.png";
import dinhero_5 from "../../assets/img/dinhero/5.png";
import dinhero_6 from "../../assets/img/dinhero/6.png";



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
            imagens: [dinhero_logo, dinhero_0, dinhero_1, dinhero_2, dinhero_3, dinhero_4, dinhero_5, dinhero_6],
            tecnologias: ["React", "Node.js", "MongoDB", "Express", "JWT"]
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