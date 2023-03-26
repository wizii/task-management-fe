import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from '../styles/board.module.scss';
import { Column } from './column';
import { deserializeColumns } from '@/lib/serializers/serialize';
import { Column as ColumnModel } from '../lib/models/column';

interface BoardProps {
    name: string;
    columns: ColumnModel[];
    handleOpenTask: () => void;
}

export function Board(props: BoardProps) {
    return (
        <div className={styles.board}>
            {
                props.columns.map(column => (
                    <Column key={column.name} name={column.name} color={column.color} handleOpenTask={props.handleOpenTask}></Column>
                ))
            }   

        </div>
    )
}