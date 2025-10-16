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
import beesaver_logo from "../../assets/img/beesaver/logo.jpg";
import beesaver_0 from "../../assets/img/beesaver/0.png";
import beesaver_1 from "../../assets/img/beesaver/1.png";
import beesaver_2 from "../../assets/img/beesaver/2.png";

// Parla imports
import parla_logo from "../../assets/img/parla/logo.jpg";

// Petag imports
import petag_logo from "../../assets/img/petag/logo.png";
import petag_0 from "../../assets/img/petag/0.jpg";
import petag_1 from "../../assets/img/petag/1.jpg";
import petag_2 from "../../assets/img/petag/2.jpg";

// MonitorIF imports
import monitorif_logo from "../../assets/img/monitorif.jpg";

// Caminho Leve MC imports
import caminholevemc_logo from "../../assets/img/mc.webp";


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
        },
        {
            titulo: "Parla",
            nomesDosIntegrantes: "Bruna Camargo Galindo, Fernanda Nascimento de Paula",
            descricao: "Plataforma para auxiliar no aprendizado de deficientes auditivos e surdos na oralização e na leitura labial - Fase II",
            descricaoCompleta: "O projeto Parla tem como objetivo desenvolver uma plataforma digital voltada ao auxílio no processo de oralização e no aprendizado da leitura labial de pessoas surdas e com deficiência auditiva severa ou profunda. A iniciativa busca promover inclusão social e educacional, contribuindo para a comunicação entre o público surdo e o mundo ouvinte, alinhando-se aos Objetivos de Desenvolvimento Sustentável (ODS) 3, 4 e 10 da ONU — Saúde e Bem-Estar, Educação de Qualidade e Redução das Desigualdades. A plataforma utiliza inteligência artificial para reconhecer sons da fala e recursos visuais, como GIFs animados, que demonstram detalhadamente os movimentos faciais e labiais de cada fonema, facilitando o aprendizado interativo e autônomo. O desenvolvimento do Parla ocorre em fases, com base em tecnologias como HTML, CSS, JavaScript e MySQL , e conta com o apoio técnico do Prof. Dr. Rafael Prearo Lima (orientador) e da Profa. Me. Talita de P. C. de Souza (coorientadora).",
            caminhoImagem: parla_logo,
            imagens: [parla_logo],
            tecnologias: ["Sem informação"],
        },
        {
            titulo: "PeTAG",
            nomesDosIntegrantes: "Everton Oliveira, Julia Christina, Lucas Julião, Wagner Kiota",
            descricao: "Aplicativo de cerca virtual para pets",
            descricaoCompleta: "Nosso aplicativo permite criar uma cerca virtual em qualquer local, definindo a área segura para o seu pet. As coleiras conectadas enviam constantemente a localização do animal para o app, que monitora se ele está dentro da área permitida. Caso o pet ultrapasse os limites da cerca, o tutor recebe imediatamente uma notificação e passa a poder rastreá-lo, garantindo mais segurança e tranquilidade ao acompanhar o paradeiro do seu animal de estimação.",
            caminhoImagem: petag_logo,
            imagens: [petag_logo, petag_0, petag_1, petag_2],
            tecnologias: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQLite', 'React', 'Vite', 'Flask'],
        },
        {
            titulo: "MonitorIF",
            nomesDosIntegrantes: "Julio César Pinto de Souza, Gustavo Barbosa de Pieri, Guilherme Salles Leite",
            descricao: "Site para organizar os encontros de monitoria acadêmica",
            descricaoCompleta: "site para organizar os encontros de monitoria acadêmica em escolas de âmbito federal, buscando otimizar o aproveitamento do tempo e melhorar a comunicação entre monitores e estudantes. A proposta visa resolver um problema recorrente na gestão dessas monitorias, que ainda ocorre de forma informal e desorganizada, comprometendo a eficácia do apoio pedagógico oferecido aos alunos.",
            caminhoImagem: monitorif_logo,
            imagens: [],
            tecnologias: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
        },
        {
            titulo: "Caminho Leve MC",
            nomesDosIntegrantes: "Emanuelly Arantes de Oliveira",
            descricao: "Plataforma de Apoio e Informação sobre a Miastenia Congênita",
            descricaoCompleta: "A Miastenia Congênita (MC) é uma doença neuromuscular genética rara e pouco conhecida do público em geral. Este projeto tem como objetivo o desenvolvimento de uma plataforma digital acessível voltada ao apoio e à informação sobre. Devido à escassez de dados acessíveis e ao alto índice de diagnósticos tardios, muitos pacientes enfrentam preconceito, desinformação e isolamento social. A proposta da plataforma “Caminho Leve MC” é oferecer um espaço acolhedor, no qual pacientes, familiares e profissionais possam compartilhar informações, experiências e apoio emocional. A iniciativa se baseia em vivências pessoais da autora e utiliza a pesquisa bibliográfica e exploratória. O projeto será desenvolvido usando metodologias da engenharia de software, como análise e levantamento de requisitos, de sistemas similares correlatos e desenvolvimento de protótipo funcional. Espera-se que o projeto apresente de forma clara e fácil as informações para as pessoas, os familiares e o público em geral, além de oferecer um canal de afeto e troca de informações entre os usuários.",
            caminhoImagem: caminholevemc_logo,
            imagens: [],
            tecnologias: ['Sem informação'],
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