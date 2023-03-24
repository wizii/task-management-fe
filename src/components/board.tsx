import styles from '../styles/board.module.css';

interface BoardProps {
    name: string;
}

export function Board(props: BoardProps) {
    return <div>This is the board {props.name}</div>
}