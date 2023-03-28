import styles from '../styles/board-header.module.scss';
import buttonStyles from '../styles/button.module.scss';
import { Logo } from './logo';

interface HeaderProps {
    boardName: string;
    currentBoardHasColumns: boolean;
    isSideBarVisibile: boolean;
    handleAddTask: () => void;
}

// TODO: board name, dots menu, disabled button color
export function BoardHeader(props: HeaderProps) {
    return (
        <div className={styles.header}>
            {!props.isSideBarVisibile &&
                <div className={styles.logoContainer}>
                    <Logo></Logo>
                </div>
            }
        <div className={styles.permanentItems}>
            <div className={styles.boardName}>{props.boardName}</div>
            <div className={styles.headerActions}>
                <button 
                    className={`${buttonStyles.button} ${buttonStyles.button__mainPurple} ${buttonStyles.button__height40} ${styles.addTaskButton}`}
                    onClick={props.handleAddTask}
                    disabled={!props.currentBoardHasColumns}
                >
                    + Add New Task
                </button>
                <div className={styles.dotsMenu}></div>
            </div>
        </div>
        </div>
    )
}