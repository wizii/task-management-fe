import { ReactNode, useEffect } from "react";
import styles from '../styles/modal.module.scss';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    title: string;
    handleClose: () => void;
}

// TODO: close when clicking outside
export default function Modal({ children, isOpen, title, handleClose }: ModalProps) {  
  useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalTitle}>{title}</div>
        {children}
      </div>
    </div>
  );
}