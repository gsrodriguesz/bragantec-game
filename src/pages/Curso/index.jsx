import { useEffect } from "react";
import { useGame } from "../../Components/GameSystem";
import styles from "./Curso.module.css";

export function Curso() {
    const { visitPage, gameState } = useGame();

    useEffect(() => {
        visitPage('curso');
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>🎓 Curso Técnico em Informática</h1>
                {gameState.playerName && (
                    <p>Olá, {gameState.playerName}! Descubra mais sobre nosso curso incrível!</p>
                )}
            </div>

            <div className={styles.content}>
                <div className={styles.infoCard}>
                    <h2>📚 Sobre o Curso</h2>
                    <p>Muitas pessoas acreditam que o curso técnico em Informática se resume a aprender Word, Excel e outras ferramentas básicas do computador. Na verdade, o que realmente vemos é muito mais profundo: como esses programas são construídos.</p>
                    <p><br />O curso técnico em Informática forma profissionais capazes de compreender e atuar em diversas áreas da tecnologia. Durante a formação, o aluno aprende desde a lógica de programação e o uso de linguagens técnicas até o desenvolvimento de sites e sistemas web, o gerenciamento de bancos de dados e a configuração de redes de computadores.</p>
                    <p><br />Além da parte técnica, o curso também estimula o empreendedorismo e o trabalho em equipe, preparando o estudante para criar soluções inovadoras e se destacar no mercado de trabalho. No projeto integrador, os alunos aplicam todos os conhecimentos adquiridos em um projeto prático, que simula desafios reais da área de tecnologia.</p>
                </div>

                <div className={styles.infoCard}>
                    <h2>💻 O que você vai aprender</h2>
                    <ul>
                        <li>PJI - Projeto Integrador</li>
                        <p>A matéria de projeto integrador tem como objetivo realizar a integração entre vários
                            componentes curriculares do curso</p>
                        <p>Para isso, os alunos são instigados a desenvolver uma solução tecnológica, com o
                            intuito de colaborar com alguma demanda social.
                        </p>
                        <p>Assim, formam-se grupos, cada qual responsável pelo seu projeto. A partir disso,
                            uma série de pesquisas, investigações e metodologias de projeto são elaboradas.
                            No decorrer do tempo, o professor responsável auxilia os alunos em cada etapa,
                            estipulando datas para entregas de cada fase do plano.
                        </p>

                        <li>Banco de Dados</li>
                        <p>Os alunos aprendem do que se trata um banco de dados e qual a sua importância
                            em um sistema. Além disso, ocorre o planejamento da organização dos dados,
                            denominado modelagem; assim, entidades, atributos e relacionamentos são
                            identificados. Também ocorre a criação de modelos lógicos e conceituais, os quais
                            serão utilizados para a construção de uma simulação real no banco. Por exemplo:
                            construir um diagrama de uma situação de aluguel de veículos, com tabelas de
                            clientes, aluguéis e automóveis.
                        </p>
                        <p>Dessa forma, os estudantes aprendem a manipular um banco de dados, utilizando a
                            linguagem SQL, criando, inserindo, consultando, atualizando e excluindo diferentes
                            dados e tabelas.</p>

                        <li>Redes de Computadores</li>
                        <p>Na matéria de redes de computadores, os alunos estudam detalhadamente como
                            ocorre a comunicação entre máquinas. Para isso, é necessário o entendimento dos
                            diferentes tipos de redes, estas que são determinadas por áreas de alcance, como a
                            LAN (rede local), WAN (rede ampla) E WLAN (rede sem fio).
                        </p>
                        <p>Além do mais, cada componente da rede é estudado, como, por exemplo, o
                            roteador, o switch, o modem, cabos e conectores presentes no sistema.
                        </p>
                        <p>Mas, precisamente no segundo ano do curso, os estudantes conhecem as camadas
                            de comunicação e o passo a passo do compartilhamento de informações entre
                            máquinas, como uma mensagem chega a outra e os processos envolvidos para isso
                            acontecer, por exemplo.</p>
                        <p>Ademais, conhecimentos de configurações de IPs e conexões são passados, unindo
                            a proteção e o monitoramento seguro da rede.</p>

                        <li>Empreendedorismo</li>
                        <p>Em empreendedorismo, os alunos são estimulados a desenvolver modelos de
                            negócios inovadores; além disso, atividades de gestão financeira em grupo são
                            colocadas em prática.
                        </p>
                        <p>Nessa matéria, os estudantes entendem do que se trata um empreendedor, as
                            características relacionadas ao empreendedorismo e como um bom modelo de
                            negócio pode se diferenciar no mercado, além do impacto no desenvolvimento local
                            e no aumento da empregabilidade.
                        </p>
                        <p>Ademais, os alunos têm a oportunidade de pensar e criar uma ideia de negócio, a
                            qual será, ao longo das aulas, aprimorada, visando um real estudo das demandas
                            de cada projeto.
                        </p>
                        <p>Dessa forma, as aulas de empreendedorismo tornam-se uma forte aliada para o
                            desenvolvimento profissional e pessoal dos estudantes, visando uma boa análise e
                            tomadas de decisões responsáveis.</p>

                    </ul>
                </div>

                <div className={styles.infoCard}>
                    <h2>🚀 Oportunidades</h2>
                    <p>Com o diploma do curso técnico, você pode trabalhar em empresas de tecnologia, startups, órgãos públicos ou até mesmo empreender com seu próprio negócio digital!</p>
                </div>

                {gameState.level >= 1 && (
                    <div className={styles.achievement}>
                        <h3>🏆 Missão Completa!</h3>
                        <p>Você ganhou +75 XP por explorar informações sobre o curso!</p>
                    </div>
                )}
            </div>
        </div>
    );
}