import { Column } from '../models/column';

type TaskData = {
    title: string;
    column: string;
    description: string; 
}

export function deserializeColumns(columns: Column[]) {
    return columns.map(column => ({
        ...column,
        color: column.color?.toLowerCase()
    }))
}

export function serializeTaskData(data: TaskData) {
    return {
        name: data.title,
        column: +data.column,
        description: data.description
    }
}