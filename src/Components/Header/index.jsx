import { Link } from "react-router-dom";
import styles from "./Header.module.css"
export function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <div className={styles.titulo}>
          15° Bragantec
        </div>
      </a>

      <div className={styles.links}>
        <Link to='/projetos' className={styles.link}>Projetos</Link>
        <Link to='/curso' className={styles.link}>Curso</Link>
        <Link to='/scratch' className={styles.link}>Scratch</Link>
      </div >


    </header>
  );
}