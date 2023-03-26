import { useState } from 'react';
import styles from '../styles/task-card.module.scss';


interface TaskCardProps {
    name: string;
    description?: string;
    handleOpenTask: () => void;
    subtasks?: [
        {
            name: string;
        }
    ]
}

export default function TaskCard(props: TaskCardProps) {
    function handleOpenTask() {
        let taskModal = TaskModal({name: props.name, description: props.description});
        props.handleOpenTask(taskModal);
    }
    return (
        <div>
        <div className={styles.card} onClick={handleOpenTask}>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.subtaskCount}> 0 of {props.subtasks?.length} subtasks </div>
        </div>
    </div>)
    

}

function TaskModal({name, description}) {
    return (
        <div className={styles.modal}>
            <div className={styles.name}>{name}</div>
            <div className={styles.description}>{description}</div>
        </div>
    )
}