import styles from './Footer.module.css'

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.pa}>
                <p className={styles.pa}>Made with 💓 by <a href="https://github.com/gsrodriguesz">Gustavo Luiz</a> and <a href="https://github.com/Guugh">Gustavo Bettoi</a></p>
                <p className={styles.pa}>3° Info - Class of 2025 💀</p>
            </div>
            <a href="/admin" className={styles.adminLink}>⚙️</a>

        </div>
    );
}