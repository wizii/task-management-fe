import Head from 'next/head'
import Styles from '../styles/main.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';
import Modal from '../components/modal';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
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
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModal, setTaskModal] = useState<ReactNode>();


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

  function openTaskModal(modal: ReactNode) {
    setTaskModal(modal)
    setIsTaskModalOpen(true);
    setIsOpen(true);
  }

  function closeAddTaskModal() {
    setIsOpen(false);
    setIsAddTaskModalOpen(false);
  }

  function closeTaskModal() {
    setIsOpen(false);
    setIsTaskModalOpen(false);
  }

  async function createTask(formJson) {
    let postBody = serializeTaskData(formJson);

    await axios.post('http://localhost:8000/boards/task', postBody);
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
                <Board name={board.name} columns={columns} handleOpenTask={openTaskModal}></Board>
            </div>
        </div>
        {isAddTaskModalOpen && 
          <Modal handleClose={closeAddTaskModal} isOpen={isOpen}>
            <AddTaskModal columns={columns} createTask={createTask}></AddTaskModal>
          </Modal>
        }
        {isTaskModalOpen && 
          <Modal handleClose={closeTaskModal} isOpen={isOpen}>
            {taskModal}
          </Modal>
        }
    </div>
    </div>
 )
}