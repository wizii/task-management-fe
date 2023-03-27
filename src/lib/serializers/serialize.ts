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

export function serializeBoardData(data) {
    let columns = Object.entries(data).filter(([key, value]) => {
        return key.startsWith('column')
    })
    columns = columns.map(([key, value]) => ({
        id: key.split('-')[1],
        name: value
    }));
    
    return {
        name: data.name,
        columns: columns
    }
}