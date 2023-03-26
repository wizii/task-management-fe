import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/column.module.scss';
import TaskCard from './task-card';
import { Task as TaskModel } from '../lib/models/task';

interface ColumnProps {
    key: string;
    color: string;
    name: string;
    handleOpenTask: () => void;
}

export function Column(props: ColumnProps) {
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
      const fetchBoards = async () => {
        const result = await axios.get('http://localhost:8000/boards/columns/tasks');
        setTasks(result.data);
      };
  
      fetchBoards();
    });

    let columnColorModifier = `columnName__${props.color}`;
    return (
            <div key={props.name} className={styles.column}>
                <div className={`${styles.columnName} ${styles[columnColorModifier]}`}>{props.name}</div>
                {
                    tasks.map(task => (
                        <TaskCard key={task.name} name={task.name} subtasks={task.subtasks} handleOpenTask={props.handleOpenTask}></TaskCard>
                    ))
                }
            </div>
    )
}