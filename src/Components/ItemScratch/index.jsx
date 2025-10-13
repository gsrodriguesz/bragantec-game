import styles from "./ItemScratch.module.css"

export function ItemScratch( {titulo, descricao, link, caminhoImagem} ){
    return(
        <div className={styles.containerMaior}>
            <div className={styles.containerEsquerdo}>
                <h2>{titulo}</h2>
                <br></br>
            <p>{descricao}</p>
            </div>
            <div className={styles.containerDireito}>
                <img src={caminhoImagem}></img>
            <a className={styles.legenda} target="_blank" href={link}>link</a>
            </div>
            
        
            
        </div>
        
            
        
       
        
    );
}