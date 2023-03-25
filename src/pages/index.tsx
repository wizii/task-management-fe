import Head from 'next/head'
import Styles from '../styles/main.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';
import { useEffect } from 'react';

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
  useEffect(() => {
     let res = fetch('http://localhost:8000/boards')  .then((response) => response.json())
     .then((data) => console.log(data));
  });

  const board = BOARDS.find(board => board.isSelected) ?? [];

  return (
    <div>
        <Head>
          <title>Task Management</title>
          <meta name="description" content="Task Management" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
    <div className={Styles.container}>
        <SideBar boards={BOARDS}></SideBar>
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