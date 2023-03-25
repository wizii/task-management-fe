import styles from '../styles/board.module.scss';
import { Column } from './column';
import TaskCard from './task-card';

interface BoardProps {
    name: string;
}

const COLUMNS = [
    {
        color: 'blue',
        name: 'todo',
        tasks: [
            {
                name: "very important task"
            },
            {
                name: "less important task"
            }
        ]

    },
    {
        color: 'purple',
        name: 'doing',
        tasks: [
            {
                name: "very important task",
                subtasks: [
                    {
                        name: 'First subtask'
                    }
                ]
            },
            {
                name: "less important task"
            }
        ]

    }
]

export function Board(props: BoardProps) {
    return (
        <div className={styles.board}>
            {
                COLUMNS.map(column => (
                    <Column key={column.name} tasks={column.tasks} name={column.name} color={column.color}></Column>
                ))
            }   

        </div>
    )
}