export interface Task {
    name: string;
    id: number;
    description?: string;
    parent: number;
    column: number;
    board: number;
}