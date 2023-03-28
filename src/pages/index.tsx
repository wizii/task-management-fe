import Head from 'next/head'
import Styles from '../styles/index.module.scss';
import { SideBar } from '../components/side-bar';
import { SideBarPopup } from '../components/side-bar-popup';
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
import { DeleteModal } from '@/components/delete-modal';

type ModalName =  'AddTaskModal' | 'AddColumnModal' | 'TaskModal' | 'AddBoardModal';

type ModalProps = {
  title: string;
  modifiers?: string[];
  hasDotsMenu?: boolean;
  actions?: {
    name: string;
    function: () => void;
  }
}

export default function Home() {
  const [boards, setBoards] = useState<BoardModel[]>([]);
  const [taskCount, setTaskCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);
  const [boardCount, setBoardCount] = useState(0);
  const [activeBoardId, setActiveBoardId] = useState<number>();
  const [columns, setColumns] = useState<Column[]>([]);
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [isSideBarPopupOpen, setIsSideBarPopupOpen] = useState(false);

  // Modal
  const [isDeleteBoardModalOpen, setIsDeleteBoardModalOpen] = useState(false);
  const [isDeleteTaskModalOpen, setIsDeleteTaskModalOpen] = useState(false);

  const [modal, setModal] = useState<ReactNode>();
  const [modalProps, setModalProps] = useState<ModalProps>();
  
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

  const boardActions = [{
    name: 'Edit Board',
    function: () => {}
  },{
    name: 'Delete Board',
    function: handleDeleteBoard,
    isRed: true
  }];

  function openModal(modalName: ModalName, options = {}) { 
    let modal = <></>
    if (modalName === 'AddTaskModal') {
      modal = <AddTaskModal columns={columns} createTask={createTask}></AddTaskModal>
      setModalProps({
        title: 'Add New Task'
      })
    } else if (modalName === 'AddColumnModal') {
      modal = <AddColumnModal createColumn={createColumn}></AddColumnModal>
      setModalProps({
        title: 'Add New Column'
      })
    } else if (modalName === 'TaskModal') {
      let task = getParentTasks().find(task => task.id === options.id);
      modal = TaskModal({
        name: task?.name,
        description: task?.description,
        selectedColumnId: task?.column,
        subtasks: task?.subtasks,
        columns: columns
      });
      setModalProps({
        title: task?.name,
        hasDotsMenu: true,
        actions: taskModalActions
      })
      setOpenTask(task);
    } else if (modalName === 'AddBoardModal') {
      modal = <AddBoardModal createBoard={createBoard}></AddBoardModal>
      setModalProps({
        title: 'Add New Board'
      })
    }
    setModal(modal);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModal(<></>)
  }

  function handleDeleteTask() {
    closeModal();
    setIsOpen(true);
    setIsDeleteTaskModalOpen(true);
  }
  
  function handleDeleteBoard() {
    setIsOpen(true);
    setIsDeleteBoardModalOpen(true);
  }

  async function deleteTask() {
    try {
      await axios.delete(`http://localhost:8000/boards/task/${openTask.id}`);
    } catch (e) {
      console.log('An error occured while deleting the task', e)
    }
    
    setIsDeleteTaskModalOpen(false);
    closeModal()
    setTaskCount(taskCount - 1);
  }

  async function deleteBoard() {
    setIsDeleteBoardModalOpen(false);
    closeModal();

    try {
      // Delete tasks
    await axios.delete('http://localhost:8000/boards/tasks', {
      board: activeBoardId
    });
    setTaskCount(0);
      // Delete columns
    await axios.delete('http://localhost:8000/boards/columns', {
        board: activeBoardId
    });
    setColumnCount(0);
    // Delete board
    await axios.delete(`http://localhost:8000/boards/board/${activeBoardId}`);
    setActiveBoardId(0);

    setBoardCount(boardCount - 1);
    } catch(e) {
      console.log('An error occured', e);
    }
  }

  useEffect(() => {
    const id = window.localStorage.getItem('activeBoardId');
    setActiveBoardId(+id);
  }, []);

  useEffect(() => {
    localStorage.setItem('activeBoardId', activeBoardId);
  }, [activeBoardId]);

  useEffect(() => {
    const fetchBoards = async () => {
      const result = await axios.get('http://localhost:8000/boards');
      setBoards(result.data);      
    };

    fetchBoards();
  }, [boardCount]);

  useEffect(() => {
    const fetchColumns = async () => {
      const result = await axios.get(`http://localhost:8000/boards/board/${activeBoardId}/columns`);
      setColumns(result.data);
      setColumnCount(result.data.length);
    };

    if (activeBoardId) {
      try {
        fetchColumns();
      } catch(e) {
        console.log('An error occured while fetching the columns', e);
      }
    }
  }, [activeBoardId, columnCount]);

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await axios.get(`http://localhost:8000/boards/board/${activeBoardId}/tasks`);
      setTasks(result.data);
      setTaskCount(result.data.length);
    };

    if (activeBoardId) {
      try {
        fetchTasks();
      } catch(e) {
        console.log('An error occured while fetching the tasks', e);
      }
    }
  }, [activeBoardId, taskCount]);


function handleSelectedBoard(id: number) {
  setActiveBoardId(+id);
}

  function closeDeleteTaskModal() {
    setIsOpen(false);
    setIsDeleteTaskModalOpen(false);
  }

  function closeDeleteBoardModal() {
    setIsOpen(false);
    setIsDeleteBoardModalOpen(false);
  }

  async function createTask(formJson) {
    setIsOpen(false);

    let postBody = {
      ...serializeTaskData(formJson),
      board: activeBoardId
    };
    setTaskCount(taskCount + 1);

    let response = await axios.post('http://localhost:8000/boards/task', postBody);
    await createSubtasks(response.data.id, postBody.subtasks)
  }

  async function createBoard(formJson) {
    setIsOpen(false);
    
    let postBody = serializeBoardData(formJson);
    let response = await axios.post('http://localhost:8000/boards/board', { name: postBody.name });
    setBoardCount(boardCount + 1);
    await createColumns(response.data.id, postBody.columns);
  }

  async function createColumn(formJson) {
    setIsOpen(false);

    let data = {
      board: activeBoardId,
      ...formJson
    }
    
    setColumnCount(columnCount + 1);
    
    await axios.post('http://localhost:8000/boards/column', data);
  }

  async function createColumns(boardId, columns) {
    let data = columns.map(column => ({
      board: boardId,
      ...column
    }))
    setColumnCount(columnCount + data.length);

    try {
      await axios.post('http://localhost:8000/boards/columns', data);
    } catch(e) {
      console.log('An error occured while creating columns', e);
    }
    
  }

  async function createSubtasks(parentId, subtasks) {
    let data = subtasks.map(subtask => ({
      parent: parentId,
      board: activeBoardId,
      ...subtask
    }))

    try {
      await axios.post('http://localhost:8000/boards/tasks', data);
    } catch(e) {
      console.log('An error occured while creating tasks', e);
    }
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

  function toggleSideBarPopup() {
    setIsSideBarPopupOpen(!isSideBarPopupOpen);
  }

  function getActiveBoardName() {
    return boards.find(({ id }) => +id === +activeBoardId)?.name;
  }

  return (
    <div>
        <Head>
          <title>Task Management</title>
          <meta name="description" content="Task Management" />
      </Head>
    <div className={Styles.container}>
        <SideBar 
          boards={boards}
          toggleSideBar={toggleSideBar}
          handleOpenAddBoardModal={() => openModal('AddBoardModal')}
          activeBoardId={activeBoardId}
          handleSelectedBoard={handleSelectedBoard}
        />
        {isSideBarPopupOpen &&
          <SideBarPopup 
            boards={boards}
            toggleSideBar={toggleSideBar}
            handleOpenAddBoardModal={() => openModal('AddBoardModal')}
            activeBoardId={activeBoardId}
            handleSelectedBoard={handleSelectedBoard}
        />
        }
        <div className={Styles.boardContainer}>
            <BoardHeader
              isSideBarVisibile={isSideBarVisible}
              showSideBarPopup={toggleSideBarPopup}
              boardName={getActiveBoardName()}
              handleAddTask={() => openModal('AddTaskModal')}
              currentBoardHasColumns={!!columns.length}
              actions={boardActions}
            />
            {boards.length ? 
            <div className={Styles.board}> 
            {columns.length ? 
              <Board 
                isSideBarVisible={isSideBarVisible}
                name={getActiveBoardName()}
                columns={getColumnsWithTasks()}
                handleOpenTaskModal={(id) => openModal('TaskModal', { id })}
                handleOpenAddColumnModal={() => openModal('AddColumnModal')}
              />
              :
              <EmptyBoard 
                text='This board is empty. Create a new column to get started.'
                buttonText='+ Add New Column'
                handleAdd={() => openModal('AddColumnModal')}
              />
            }
          </div> :
            <div className={Styles.emptyBoard}>
              <EmptyBoard 
                text='Create a new board to get started.'
                buttonText='+ Add New board'
                handleAdd={() => openModal('AddBoardModal')}
              />
            </div>
            }
            
        </div>
        {isOpen &&
          <Modal
            handleClose={closeModal}
            isOpen={isOpen}
            title={modalProps?.title} 
            titleModifiers={modalProps?.modifiers}
            hasDotsMenu={modalProps?.hasDotsMenu}
            actions={modalProps?.actions}
          >
            {modal}
          </Modal>
        }
        {isDeleteTaskModalOpen && 
          <Modal handleClose={closeDeleteTaskModal} isOpen={isOpen} title={'Delete this task?'} titleModifiers={['isRed']}>
            <DeleteModal handleCancel={closeDeleteTaskModal} handleDelete={deleteTask} 
              text={`Are you sure you want to delete the '${openTask.name}' task and its subtasks? This action cannot be reversed.`} />
          </Modal>
        }
        {isDeleteBoardModalOpen && 
          <Modal handleClose={closeModal} isOpen={isOpen} title={'Delete this board?'} titleModifiers={['isRed']}>
            <DeleteModal handleCancel={closeDeleteBoardModal} handleDelete={deleteBoard} 
            text={`Are you sure you want to delete the '${getActiveBoardName()}' board? This action will remove all columns and tasks and cannot be reversed.`}/>
          </Modal>
        }
    </div>
    </div>
 )
}