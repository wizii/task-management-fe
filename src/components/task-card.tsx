import { useState } from 'react';
import styles from '../styles/task.module.scss';
import modalStyles from '../styles/modal.module.scss';


interface TaskCardProps {
    name: string;
    id: number;
    description?: string;
    column: string;
    handleOpenTask: (id: number) => void;
    subtasks?: [
        {
            name: string;
        }
    ]
}

export default function TaskCard(props: TaskCardProps) {
    return (
        <div>
        <div className={styles.card} onClick={e => props.handleOpenTask(props.id)}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.subtaskCount}> 0 of {props.subtasks?.length} subtasks </div>
        </div>
    </div>)
    

}