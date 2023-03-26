import styles from '../styles/board-header.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface HeaderProps {
    boardName: string;
    handleAddTask: () => void;
}

// TODO: board name, dots menu
export function BoardHeader(props: HeaderProps) {
    return (
        <div className={styles.header}>
        <div className={styles.boardName}>{props.boardName}</div>
        <div className={styles.headerActions}>
            <button className={`${buttonStyles.mainPurple} ${styles.addTaskButton}`} onClick={props.handleAddTask}>+ Add New Task</button>
            <div className={styles.dotsMenu}></div>
        </div>
        </div>
    )
}