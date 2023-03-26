import Head from 'next/head'
import Styles from '../styles/main.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';
import Modal from '../components/modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskModal from '@/components/add-task-modal';
import { Column } from '@/lib/models/column';
import { serializeTaskData } from '../lib/serializers/serialize'

type Board = {
  isSelected: boolean;
  name: string;
  id: number;
}

export default function Home() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);



  useEffect(() => {
    const fetchBoards = async () => {
      const result = await axios.get('http://localhost:8000/boards');
      setBoards(result.data);
    };

    fetchBoards();
  });

  useEffect(() => {
    const fetchColumns = async () => {
      const result = await axios.get('http://localhost:8000/boards/columns');
      setColumns(result.data);
    };

    fetchColumns();
  });

  const board = boards?.find(board => board.isSelected) ?? {};

  function openAddTaskModal() {
    setIsAddTaskModalOpen(true);
    setIsOpen(true);
  }

  async function createTask(e: Event) {
    e.preventDefault()
    let form = e.target as HTMLFormElement;
    let formData = new FormData(form);
    let formJson = serializeTaskData(Object.fromEntries(formData.entries()));

    await axios.post('http://localhost:8000/boards/task', formJson);
    setIsAddTaskModalOpen(false);
    setIsOpen(false);
  }

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
            <BoardHeader boardName={board.name} handleAddTask={openAddTaskModal}></BoardHeader>
            <div className={Styles.board}>
                <Board name={board.name} columns={columns}></Board>
            </div>
        </div>
        {isAddTaskModalOpen && 
          <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
            <AddTaskModal columns={columns} createTask={createTask}></AddTaskModal>
          </Modal>
        }
    </div>
    </div>
 )
}