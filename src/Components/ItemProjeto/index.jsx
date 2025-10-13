import { useState } from 'react'
import styles from "./ItemProjeto.module.css"
import { Modal, ModalHeader, ModalBody } from '../Modal'

export function ItemProjeto({
    titulo,
    descricao,
    nomesDosIntegrantes,
    caminhoImagem,
    descricaoCompleta = descricao,
    imagens = [caminhoImagem],
    tecnologias = []
}) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleClick = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <div className={styles.containerMaior} onClick={handleClick}>
                <div className={styles.containerEsquerdo}>
                    <h2 className={styles.titulo}>{titulo}</h2>
                    <p className={styles.descricao}>{descricao}</p>
                    <p className={styles.integrantes}>Por: {nomesDosIntegrantes}</p>
                </div>
                <div className={styles.containerDireito}>
                    <img
                        src={caminhoImagem}
                        alt={titulo}
                        className={styles.imagem}
                    />
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalHeader>
                    <h2>{titulo}</h2>
                </ModalHeader>
                <ModalBody>
                    <p className={styles.modalDescription}>{descricaoCompleta}</p>

                    {tecnologias.length > 0 && (
                        <div className={styles.tecnologias}>
                            <h3>Tecnologias utilizadas:</h3>
                            <div className={styles.tecnologiasList}>
                                {tecnologias.map((tech, index) => (
                                    <span key={index} className={styles.tecnologiaTag}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.integrantesSection}>
                        <h3>Desenvolvido por:</h3>
                        <p>{nomesDosIntegrantes}</p>
                    </div>

                    {imagens.length > 0 && (
                        <div className={styles.imagensSection}>
                            <h3>Galeria do projeto:</h3>
                            <div className={styles.imageGrid}>
                                {imagens.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${titulo} - imagem ${index + 1}`}
                                        className={styles.modalImage}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </ModalBody>
            </Modal>
        </>
    )
}