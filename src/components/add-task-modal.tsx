import { Column } from '@/lib/models/column';
import { FormEvent, useState } from 'react';
import styles from '../styles/add-task-modal.module.scss';
import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';
import { RemovableField } from './removable-input-field';

interface AddTaskModalProps {
    columns: Column[];
    createTask: (e: FormEvent<HTMLFormElement>) => void;
}

export default function AddTaskModal(props: AddTaskModalProps) {
    const [subtaskCount, setSubtaskCount] = useState(1);
    const [subtasks, setSubtasks] = useState([{ id: 1, name: '' }]);

    function sendData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        props.createTask(formJson);
    }

    function addSubtask() {
        setSubtaskCount(subtaskCount + 1);
        setSubtasks([...subtasks, { id: subtaskCount + 1, name: '' }]);
    }

    function removeSubtask(id: number) {
        let remainingSubtasks = subtasks.filter(subtask => subtask.id !== id);
        setSubtasks(remainingSubtasks);
    }

    return (
        <form onSubmit={sendData}>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}>Title</div>
                <input
                    name='title'
                    className={`${modalStyles.input} ${styles.taskTitle}`} 
                    type='text' 
                    placeholder='e.g. Take coffee break'
                    required
                />
            </div>
            
            <div className={modalStyles.section}>
                <div className={modalStyles.label}>Description</div>
                <textarea
                    name='description'
                    className={`${modalStyles.input} ${styles.taskDescription}`} 
                    placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                />
            </div>
            {subtasks.length ? 
                <div className={modalStyles.section}>
                <div className={modalStyles.label}>Subtasks</div>
                {subtasks.map(subtask => (
                    <RemovableField key={subtask.id} removeField={removeSubtask} id={subtask.id}>
                        <input 
                            type='text'
                            name={`subtask-${subtask.id}`}
                            id={`subtask-${subtask.id}`}
                            className={modalStyles.input} 
                            placeholder='e.g. Make coffee'
                            required
                        />
                    </RemovableField>
                ))} 
                </div>
                : ''
            }
            <div className={modalStyles.section}>
                <button 
                    type='button'
                    onClick={addSubtask}
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__fadedPurple} 
                        ${buttonStyles.button__height40}
                        ${buttonStyles.button__isInModal}
                    `}
                >
                    + Add New Subtask
                </button>
            </div>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}>Status</div>
                <select className={`${modalStyles.input} ${styles.status}`} required name='column' id='column'>
                    {props.columns.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                </select>
            </div>
            <button 
                type='submit'
                className={`${buttonStyles.button} ${buttonStyles.button__mainPurple} ${buttonStyles.button__height40} ${buttonStyles.button__isInModal}`}
            >
                Create Task
            </button>
        </form>
    )
}