import { useEffect } from "react";
import { useGame } from "../../Components/GameSystem";
import { ItemProjeto } from "../../Components/ItemProjeto";
import styles from "./Projetos.module.css";


import flappy from "../../assets/img/flappy.png";


// Dinhero imports
import dinhero_logo from "../../assets/img/dinhero/logo.png";
import dinhero_0 from "../../assets/img/dinhero/0.png";
import dinhero_1 from "../../assets/img/dinhero/1.png";
import dinhero_2 from "../../assets/img/dinhero/2.png";
import dinhero_3 from "../../assets/img/dinhero/3.png";
import dinhero_4 from "../../assets/img/dinhero/4.png";
import dinhero_5 from "../../assets/img/dinhero/5.png";
import dinhero_6 from "../../assets/img/dinhero/6.png";

// Beesaver imports
import beesaver_logo from "../../assets/img/beesaver/logo.png";
import beesaver_0 from "../../assets/img/beesaver/0.png";
import beesaver_1 from "../../assets/img/beesaver/1.png";
import beesaver_2 from "../../assets/img/beesaver/2.png";



export function Projetos() {
    const { visitPage, addXP, gameState } = useGame();

    useEffect(() => {
        visitPage('projetos');
    }, []);

    const handleProjectClick = () => {
        addXP(25);
    };

    const projetos = [
        {
            titulo: "DinHero",
            nomesDosIntegrantes: "Gustavo Bettoi, Gustavo Luiz, Eduardo Lopes",
            descricao: "Projeto voltado ao ensino de educação financeira por meio de trilhas personalizadas de estudo",
            descricaoCompleta: "DinHero é uma plataforma educacional inovadora que transforma o aprendizado sobre educação financeira em uma experiência gamificada e personalizada. O projeto oferece trilhas de estudo adaptáveis ao perfil de cada usuário, desde iniciantes até pessoas com conhecimento avançado em finanças. Através de módulos interativos, quizzes e simuladores, os usuários aprendem conceitos fundamentais como orçamento pessoal, investimentos, controle de gastos e planejamento financeiro a longo prazo. A plataforma também inclui ferramentas práticas para acompanhamento de metas financeiras e calculadoras especializadas.",
            caminhoImagem: dinhero_logo,
            imagens: [dinhero_logo, dinhero_0, dinhero_1, dinhero_2, dinhero_3, dinhero_4, dinhero_5, dinhero_6],
            tecnologias: ["React", "Node.js", "MongoDB", "Express", "JWT"],
            linkExterno: "https://dinhero.vercel.app",
            textoBotao: "🌐 Acessar DinHero"
        },
        {
            titulo: "BeeSaver",
            nomesDosIntegrantes: "Karoline Manole Andrade Sena, Laura Martins Valentim, Mariana Leite Barbosa, Pedro Henrique Borges de Oliveira",
            descricao: "Projeto visa facilitar esforços comunitários para o crescimento da população de abelhas",
            descricaoCompleta: "Este projeto apresenta como proposta contribuir para o aumento da população de abelhas em nossa comunidade no município de Bragança Paulista. Elas são reconhecidas como fundamentais para a biodiversidade e para a segurança alimentar global, são consideradas essenciais para a manutenção da vida em nosso planeta. Pretende-se criar um aplicativo informativo para a administração do cultivo de flores e diferentes vegetações, auxiliando o usuário para a realização de melhores práticas de cultivo, visando o aumento populacional das diferentes espécies de abelhas. O aplicativo também pretende propor ao usuário, participar da construção de um mapa colaborativo sobre a incidência e densidade de abelhas. Para desenvolvimento visual do aplicativo será usada a ferramenta FlutterFlow que permite criar softwares móveis usando o framework Flutter do Google. Espera-se colaborar com a conscientização sobre a importância das abelhas para os ecossistemas e a manutenção da vida no planeta Terra.",
            caminhoImagem: beesaver_logo,
            imagens: [beesaver_logo, beesaver_0, beesaver_1, beesaver_2],
            tecnologias: ["Sem informação"],
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
                            linkExterno={projeto.linkExterno}
                            textoBotao={projeto.textoBotao}
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