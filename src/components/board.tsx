import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/board.module.scss';
import { Column } from './column';
import { deserializeColumns } from '@/lib/serializers/serialize';
import { Column as ColumnModel } from '../lib/models/column';

interface BoardProps {
    name: string;
    columns: ColumnModel[];
    handleOpenTaskModal: () => void;
    handleOpenAddColumnModal: () => void;
}

// TODO: edit, delete
export function Board(props: BoardProps) {
    return (
        <div className={styles.board}>
            {
                props.columns.map(column => (
                    <Column key={column.name} name={column.name} color={column.color} tasks={column.tasks} handleOpenTask={props.handleOpenTaskModal}></Column>
                ))
            }
            <div className={styles.addColumn}>
                <div className={styles.addColumnLink} onClick={props.handleOpenAddColumnModal}>+ New Column</div>
            </div>

        </div>
    )
}