import { useEffect } from 'react'
import styles from './Modal.module.css'

export function Modal({ isOpen, onClose, children }) {
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}

export function ModalHeader({ children }) {
    return <div className={styles.header}>{children}</div>
}

export function ModalBody({ children }) {
    return <div className={styles.body}>{children}</div>
}

export function ModalFooter({ children }) {
    return <div className={styles.footer}>{children}</div>
}