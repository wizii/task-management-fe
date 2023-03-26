import { ReactNode, useEffect } from "react";
import styles from '../styles/modal.module.scss';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    handleClose: () => void;
}

export default function Modal({ children, isOpen, handleClose }: ModalProps) {  
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
      {/* <button onClick={handleClose} className="close-btn">
        Close
      </button> */}
      <div className="modal-content">{children}</div>
    </div>
  );
}