import styles from '../styles/task-card.module.scss';


interface TaskCardProps {
    name: string;
    subtasks?: [
        {
            name: string;
        }
    ]
}

export default function TaskCard(props: TaskCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.subtaskCount}> 0 of {props.subtasks?.length} subtasks </div>
        </div>
    )

}