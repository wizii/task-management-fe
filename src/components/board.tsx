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

export function Board(props: BoardProps) {
    return (
        <div className={styles.board}>
            {
                props.columns.map((column, index) => (
                    <Column key={index} name={column.name} color={column.color} tasks={column.tasks} handleOpenTask={props.handleOpenTaskModal}></Column>
                ))
            }
            <div className={styles.addColumn}>
                <div className={styles.addColumnLink} onClick={props.handleOpenAddColumnModal}>+ New Column</div>
            </div>

        </div>
    )
}