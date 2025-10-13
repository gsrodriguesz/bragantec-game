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
                    <p>O Curso Técnico em Informática do Instituto Federal oferece uma formação completa para os futuros profissionais da área de tecnologia. Durante o curso, os alunos aprendem programação, desenvolvimento web, banco de dados, redes de computadores e muito mais!</p>
                </div>

                <div className={styles.infoCard}>
                    <h2>💻 O que você vai aprender</h2>
                    <ul>
                        <li>Programação em diversas linguagens</li>
                        <li>Desenvolvimento de sites e aplicações</li>
                        <li>Banco de dados e sistemas</li>
                        <li>Redes de computadores</li>
                        <li>Segurança da informação</li>
                        <li>Manutenção de equipamentos</li>
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