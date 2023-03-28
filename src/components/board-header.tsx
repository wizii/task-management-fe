import { useState } from 'react';
import styles from '../styles/board-header.module.scss';
import buttonStyles from '../styles/button.module.scss';
import { Logo } from './logo';

interface HeaderProps {
    boardName: string;
    currentBoardHasColumns: boolean;
    isSideBarVisibile: boolean;
    showSideBarPopup: () => void;
    actions: {
        name: string;
        isRed: boolean;
        function: () => void;
    }[]
    handleAddTask: () => void;
}

// TODO:disabled button color
export function BoardHeader(props: HeaderProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSideBarPopupOpen, setIsSideBarPopupOpen] = useState(false);

  function togglePopup() {
    setIsPopupOpen(!isPopupOpen);
  }

  function toggleSideBarPopup() {
    setIsSideBarPopupOpen(!isSideBarPopupOpen);
    props.showSideBarPopup();
  }

  function handleActionClick(func: () => void) {
    setIsPopupOpen(false);
    func();
  }

    return (
        <div className={styles.header}>
            {!props.isSideBarVisibile &&
                <div className={styles.logoContainer}>
                    <Logo></Logo>
                </div>
            }
        <div className={styles.permanentItems}>
            <div className={styles.boardNameContainer}>
                <div className={styles.boardName}>{props.boardName}
                    <div className={`${styles.sideBarButton} ${isSideBarPopupOpen ? styles.sideBarButton__isUp : ''}`} onClick={toggleSideBarPopup}></div>
                </div>
            </div>
            <div className={styles.headerActions}>
                <button 
                    className={`${buttonStyles.button} ${buttonStyles.button__height40} ${styles.addTaskButton} ${!props.currentBoardHasColumns ? buttonStyles.button__isDisabled : buttonStyles.button__mainPurple}  `}
                    onClick={props.handleAddTask}
                    disabled={!props.currentBoardHasColumns}
                >
                </button>
                <div className={styles.dotsMenu} onClick={togglePopup}></div>
            </div>
        </div>
        {isPopupOpen && props.actions?.length ?
          <div className={styles.actionsPopup}>
            {props.actions?.map((action, key) => (
              <div key={key}
                className={`${styles.action} ${action.isRed ? styles.action__isRed : ''}`}
                onClick={() => handleActionClick(action.function)}
            >
                {action.name}
            </div>
            ))}
          </div> 
          : ''
        }
        </div>
    )
}