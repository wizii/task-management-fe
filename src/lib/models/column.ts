import { Task } from './task';

export interface Column {
    name: string;
    color?: string;
    id: number;
    board: number;
    tasks: Task[]
}