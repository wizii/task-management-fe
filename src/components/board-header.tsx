import styles from '../styles/board-header.module.css';

interface HeaderProps {
    boardName: string;
}

export function BoardHeader(props: HeaderProps) {
    return (
        <div className={styles.header}>
        <div className={styles.boardName}>{props.boardName}</div>
        <div className={styles.headerActions}>
            <button className={styles.addTaskButton}>+ Add New Task</button>
            <div className={styles.dotsMenu}></div>
        </div>
        </div>
    )
}
