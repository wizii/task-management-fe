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


// TODO: required fields, create sub tasks
export default function AddTaskModal(props: AddTaskModalProps) {
    // [erroredFields, setErroredFields] = useState({});

    const requiredFields = ['title', 'column'];

    function validateData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        props.createTask(formJson);
    }

    return (
        <form onSubmit={validateData}>
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
            <div className={modalStyles.section}>
                <div className={modalStyles.label}>Subtasks</div>
                <RemovableField>
                    <input name='subtask-1' className={`${modalStyles.input} ${styles.subTask}`} placeholder='e.g. Make coffee' />
                </RemovableField>
                <RemovableField>
                    <input name ='subtask-2' className={`${modalStyles.input} ${styles.subTask}`} placeholder='e.g. Drink coffee & smile' />
                </RemovableField>
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