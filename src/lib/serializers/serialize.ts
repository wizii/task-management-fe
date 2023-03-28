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
    let subtasks = Object.entries(data).filter(([key, value]) => {
        return key.startsWith('subtask')
    }).map (([key, value]) => ({
        column: +data.column,
        name: value
    }));

    return {
        name: data.title,
        column: +data.column,
        description: data.description,
        subtasks: subtasks
    }
}

export function serializeBoardData(data) {
    let columns = Object.entries(data).filter(([key, value]) => {
        return key.startsWith('column')
    })
    columns = columns.map(([key, value]) => ({
        name: value
    }));
    
    return {
        name: data.name,
        columns: columns
    }
}