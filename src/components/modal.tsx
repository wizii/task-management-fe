import { ReactNode, useEffect, useState } from "react";
import styles from '../styles/modal.module.scss';

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    title?: string;
    hasDotsMenu?: boolean;
    titleModifiers?: string[];
    handleClose: () => void;
    actions?: {
      name: string;
      isRed: boolean;
      function: () => void;
    }[]
}

// Modal closes by pressing escape key
export default function Modal({ children, isOpen, title, hasDotsMenu, actions, handleClose, titleModifiers }: ModalProps) {  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  function togglePopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  function classModifiers() {  
    let classes =titleModifiers?.map(modifier => styles[`modalTitle__${modifier}`]).join(' ');
    return classes;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>        
      {isPopupOpen && actions?.length ?
          <div className={styles.actionsPopup}>
            {actions?.map(action => (
              <div key={action.name} className={`${styles.action} ${action.isRed ? styles.action__isRed : ''}`} onClick={action.function}>{action.name}</div>
            ))}
          </div> 
          : ''
        }
        <div className={styles.modalHeader}>
          <div className={`${styles.modalTitle} ${classModifiers()}`}>{title}</div>
          {hasDotsMenu ? 
            <div className={styles.dotsMenu} onClick={togglePopup}></div>
            : ''
          }
        </div>
        {children}
      </div>
    </div>
  );
}