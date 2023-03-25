import styles from '../styles/column.module.scss';
import TaskCard from './task-card';

interface ColumnProps {
    key: string;
    color: string;
    name: string;
    tasks: [
        {
            subtasks: [
                {
                    name: string;
                }
            ]
            name: string;
        }
    ]
}

export function Column(props: ColumnProps) {
    let columnColorModifier = `columnName__${props.color}`;
    return (
            <div key={props.name} className={styles.column}>
                <div className={`${styles.columnName} ${styles[columnColorModifier]}`}>{props.name}</div>
                {
                    props.tasks.map(task => (
                        <TaskCard key={task.name} name={task.name} subtasks={task.subtasks}></TaskCard>
                    ))
                }
            </div>
    )
}