import styles from "./ItemScratch.module.css"

export function ItemScratch({ titulo, descricao, link, caminhoImagem }) {
    return (
        <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.botaoExterno}
        >

            <div className={styles.containerMaior}>
                <div className={styles.containerEsquerdo}>
                    <h2 className={styles.titulo}>{titulo}</h2>
                    <p className={styles.descricao}>{descricao}</p>
                </div>
                {/* {caminhoImagem && (
                    <div className={styles.containerDireito}>
                        <img
                            src={caminhoImagem}
                            alt={titulo}
                            className={styles.imagem}
                        />
                    </div>
                )} */}
            </div>
        </a>
    );
}