import Styles from '../styles/main.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Board = {
  isSelected: boolean;
  name: string;
  id: number;
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    const fetchBoards = async () => {
      const result = await axios.get('http://localhost:8000/boards');
      setBoards(result.data);
    };

    fetchBoards();
  });

  const board = boards?.find(board => board.isSelected) ?? {};

  return (
    <div>
        <Head>
          <title>Task Management</title>
          <meta name="description" content="Task Management" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    <div className={Styles.container}>
        <SideBar boards={boards}></SideBar>
        <div className={Styles.boardContainer}>
            <BoardHeader boardName={board.name}></BoardHeader>
            <div className={Styles.board}>
                <Board name={board.name}></Board>
            </div>
        </div>
    </div>
    </div>
 )
}