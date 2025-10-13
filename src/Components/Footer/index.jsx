import styles from './Footer.module.css'

export function Footer() {
    return (
        <div className={styles.footer}>
            <p className={styles.pa}>Desenvolvido por Gustavo Bettoi - 3º informática 2025</p>
            <a href="/admin" className={styles.adminLink}>⚙️</a>
        </div>
    );
}