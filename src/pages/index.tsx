import Head from 'next/head'
import Styles from '../styles/main.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Board = {
  isSelected: boolean;
  name: string;
  id: number;
}

const BOARDS = [{
  isSelected: true,
  name: 'Platform Launch',
  columns: [
    {
        color: 'blue',
        name: 'todo',
        tasks: [
            {
                name: "very important task"
            },
            {
                name: "less important task"
            }
        ]

    },
    {
        color: 'purple',
        name: 'doing',
        tasks: [
            {
                name: "very important task",
                subtasks: [
                    {
                        name: 'First subtask'
                    }
                ]
            },
            {
                name: "less important task"
            }
        ]

    }
]
},
{
  isSelected: false,
  name: 'Marketing Plan',
  columns: [
    {
        color: 'blue',
        name: 'todo',
        tasks: [
            {
                name: "very important task"
            },
            {
                name: "less important task"
            }
        ]

    },
    {
        color: 'purple',
        name: 'doing',
        tasks: [
            {
                name: "very important task",
                subtasks: [
                    {
                        name: 'First subtask'
                    }
                ]
            },
            {
                name: "less important task"
            }
        ]

    }
]
}]

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