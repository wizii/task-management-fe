import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/column.module.scss';
import TaskCard from './task-card';
import { Task, Task as TaskModel } from '../lib/models/task';

interface ColumnProps {
    key: string;
    color: string;
    name: string;
    tasks: Task[];
    handleOpenTask: () => void;
}

export function Column(props: ColumnProps) {
    let columnColorModifier = `columnName__${props.color}`;
    return (
            <div key={props.name} className={styles.column}>
                <div className={`${styles.columnName} ${styles[columnColorModifier]}`}>{props.name}</div>
                {
                    props.tasks.map(task => (
                        <TaskCard 
                            key={task.name}
                            name={task.name}
                            id={task.id}
                            subtasks={task.subtasks}
                            column={props.name}
                            handleOpenTask={props.handleOpenTask}
                        >
                        </TaskCard>
                    ))
                }
            </div>
    )
}