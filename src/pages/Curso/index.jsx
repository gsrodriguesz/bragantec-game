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
                        <li>Lógica de programação</li>
                        <p>Aprendemos a pensar como programadores, vendo o básico da programação. Vemos o que é algoritmo e como construir um, além de conceitos fundamentais como variáveis, estruturas de decisão e repetição, etc. Essa base é essencial para que os alunos entendam outras linguagens de programação que venham a aprender.
                        </p>
                        <p>Algoritmo = receita, lista de passos do que fazer. <br />Linguagem de programação = é a língua que você vai escrever o seu algoritmo.</p>

                        <li>Linguagem técnica</li>
                        <p>É aqui que vemos as linguagens de programação, em que começamos aprendendo a programar o básico com ela e gradualmente nos aprofundando.
                            Ex.: C#, Python, Java.
                        </p>

                        <li>Programação Web</li>
                        <p>Os alunos aprendem a criar sites e aplicações para a internet. Na matéria, são estudadas linguagens de programação web (HTML, CSS, JavaScript, JSX) que formam a base de qualquer página web. Vemos também estruturação de conteúdo, design responsivo (para sites funcionarem bem em celulares e computadores) e interatividade com o usuário (tipo fazer alguma ação quando o usuário clicar em algum botão).</p>

                        <li>Projeto Integrador</li>
                        <p>A matéria de projeto integrador, conhecida como PJI.
                            É uma matéria, que tem como objetivo criarmos algum projeto que busca solucionar algum problema social, utilizando os conhecimentos do nosso curso técnico em informática
                            Daqui a pouco nós mostraremos alguns projetos para vocês.</p>
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