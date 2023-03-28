import Head from 'next/head'
import Styles from '../styles/index.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';
import { EmptyBoard } from '../components/empty-board';
import Modal from '../components/modal';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import AddTaskModal from '@/components/add-task-modal';
import { Column } from '@/lib/models/column';
import { TaskModal } from '../components/task-modal'; 
import { serializeTaskData, serializeBoardData } from '../lib/serializers/serialize';
import { Task } from '@/lib/models/task';
import  { Board as BoardModel } from '@/lib/models/board';
import AddBoardModal from '@/components/add-board-modal';
import AddColumnModal from '@/components/add-column-modal';
import { DeleteTaskModal } from '@/components/delete-task-modal';

// TODO: responsive, error handling, (layout and routes), useEffect dependencies, createColumns in create board, deleting all boards (empty)?
export default function Home() {
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardModel[]>({});
  const [taskCount, setTaskCount] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState(1);
  const [columns, setColumns] = useState<Column[]>([]);
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);
  const [isAddColumnModalOpen, setIsAddColumnModalOpen] = useState(false);
  const [isAddBoardModalOpen, setIsAddBoardModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskModal, setTaskModal] = useState<ReactNode>();
  const [openTask, setOpenTask] = useState<Task>();
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);

  const taskModalActions = [{
    name: 'Edit Task',
    function: () => {}
  },{
    name: 'Delete Task',
    function: handleDeleteTask,
    isRed: true
  }];

  function handleDeleteTask() {
    setIsTaskModalOpen(false);
    setIsDeleteTaskModalOpen(true);
  }

  async function deleteTask() {
    setIsDeleteTaskModalOpen(false);
    setIsOpen(false);
    await axios.post('http://localhost:8000/boards/task', {
      CRUDFlag: 'D',
      id: openTask?.id
    });
  }

  useEffect(() => {
    const fetchBoards = async () => {
      const result = await axios.get('http://localhost:8000/boards');
      setBoards(result.data);      
    };

    fetchBoards();
  }, []);

  useEffect(() => {
    const fetchColumns = async () => {
      const result = await axios.get(`http://localhost:8000/boards/board/${activeBoardId}/columns`);
      setColumns(result.data);
    };

    fetchColumns();
  }, [activeBoardId]);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get(`http://localhost:8000/boards/board/${activeBoardId}/tasks`);
      setTasks(result.data);
      setTaskCount(result.data.length);
    };

    fetchTasks();
  }, [activeBoardId, taskCount]);

function handleSelectedBoard(id: number) {
  setActiveBoardId(id);
  setActiveBoard(boards.filter(board => board.id === id));
}

  function openAddTaskModal() {
    setIsAddTaskModalOpen(true);
    setIsOpen(true);
  }

  function openTaskModal(id: number) {
    let task = getParentTasks().find(task => task.id === id);
    let taskModal = TaskModal({
      name: task?.name,
      description: task?.description,
      selectedColumnId: task?.column,
      subtasks: task?.subtasks,
      columns: columns
    });
    setTaskModal(taskModal);
    setOpenTask(task);
    setIsTaskModalOpen(true);
    setIsOpen(true);
  }

  // TODO: refactor: DRY

  function openAddColumnModal() {
    setIsAddColumnModalOpen(true);
    setIsOpen(true);
  }

  function openAddBoardModal() {
    setIsAddBoardModalOpen(true);
    setIsOpen(true);
  }

  function closeAddTaskModal() {
    setIsOpen(false);
    setIsAddTaskModalOpen(false);
  }

  function closeAddColumnModal() {
    setIsOpen(false);
    setIsAddColumnModalOpen(false);
  }

  function closeDeleteTaskModal() {
    setIsOpen(false);
    setIsDeleteTaskModalOpen(false);
  }

  function closeAddBoardModal() {
    setIsOpen(false);
    setIsAddBoardModalOpen(false);
  }

  function closeTaskModal() {
    setIsOpen(false);
    setIsTaskModalOpen(false);
  }

  async function createTask(formJson) {
    let postBody = {
      CRUDFlag: 'C',
      ...serializeTaskData(formJson),
      board: activeBoardId
    };
    setTaskCount(taskCount + 1);

    await axios.post('http://localhost:8000/boards/task', postBody);
    setIsAddTaskModalOpen(false);
    setIsOpen(false);
  }

  async function createBoard(formJson) {
    setIsAddTaskModalOpen(false);
    setIsOpen(false);
    
    let postBody = serializeBoardData(formJson);
    let response = await axios.post('http://localhost:8000/boards/board', { name: postBody.name });
    await createColumns(response.data.id, postBody.columns);
  }

  async function createColumn(formJson) {
    setIsAddColumnModalOpen(false);
    setIsOpen(false);

    let data = {
      board: activeBoardId,
      ...formJson
    }
    
    await axios.post('http://localhost:8000/boards/column', data);
  }

  async function createColumns(boardId, columns) {
    let data = columns.map(column => ({
      board: boardId,
      ...column
    }))
    await axios.post('http://localhost:8000/boards/columns', data);
  }

  function getColumnsWithTasks() {
    return columns.map(column => ({
      ...column,
      tasks: getParentTasks().filter(task => task.column === column.id && task.board == column.board)
    }))
  }

  function getParentTasks() {
    return allTasks.filter(task => task.parent == null).map(parent => ({
      ...parent,
      subtasks: allTasks.filter(task => task.parent === parent.id)
    }));
  }

  function toggleSideBar(value: boolean) {
    setIsSideBarVisible(value);
  }

  return (
    <div>
        <Head>
          <title>Task Management</title>
          <meta name="description" content="Task Management" />
      </Head>
    <div className={Styles.container}>
        <SideBar boards={boards} toggleSideBar={toggleSideBar} handleOpenAddBoardModal={openAddBoardModal} activeBoardId={activeBoardId} handleSelectedBoard={handleSelectedBoard}></SideBar>
        <div className={Styles.boardContainer}>
            <BoardHeader isSideBarVisibile={isSideBarVisible} boardName={activeBoard.name} handleAddTask={openAddTaskModal} currentBoardHasColumns={!!columns.length}></BoardHeader>
            <div className={Styles.board}>
              {columns.length ? 
                <Board name={activeBoard.name} columns={getColumnsWithTasks()} handleOpenTaskModal={openTaskModal} handleOpenAddColumnModal={openAddColumnModal}></Board>
                :
                <EmptyBoard handleAddColumn={openAddColumnModal}></EmptyBoard>
              }
            </div>
        </div>
        {isAddTaskModalOpen && 
          <Modal handleClose={closeAddTaskModal} isOpen={isOpen} title='Add New Task'>
            <AddTaskModal columns={columns} createTask={createTask}></AddTaskModal>
          </Modal>
        }
        {isTaskModalOpen && 
          <Modal 
            title={openTask?.name}
            handleClose={closeTaskModal}
            isOpen={isOpen}
            hasDotsMenu={true}
            actions={taskModalActions}
          >
            {taskModal}
          </Modal>
        }
        {isAddColumnModalOpen && 
          <Modal handleClose={closeAddColumnModal} isOpen={isOpen} title='Add New Column'>
            <AddColumnModal createColumn={createColumn}></AddColumnModal>
          </Modal>
        }
        {isAddBoardModalOpen && 
          <Modal handleClose={closeAddBoardModal} isOpen={isOpen} title={'Add New Board'}>
            <AddBoardModal createBoard={createBoard}></AddBoardModal>
          </Modal>
        }
        {isDeleteTaskModalOpen && 
          <Modal handleClose={closeDeleteTaskModal} isOpen={isOpen} title={'Delete this task?'} titleModifiers={['isRed']}>
            <DeleteTaskModal handleCancel={closeDeleteTaskModal} handleDelete={deleteTask}></DeleteTaskModal>
          </Modal>
        }
    </div>
    </div>
 )
}