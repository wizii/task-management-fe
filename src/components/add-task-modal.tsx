import { Column } from '@/lib/models/column';
import { FormEvent, useState } from 'react';
import styles from '../styles/add-task-modal.module.scss';
import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface AddTaskModalProps {
    columns: Column[];
    createTask: (e: FormEvent<HTMLFormElement>) => void;
}

export default function AddTaskModal(props: AddTaskModalProps) {
    // [erroredFields, setErroredFields] = useState({});

    const requiredFields = ['title', 'column'];

    function validateData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        
        
        // props.createTask(formJson);
    }

    return (
        <div className={modalStyles.modalContent}>
            <form onSubmit={validateData}>
                <div className={styles.title}>Add New Task</div>
                <label className={styles.label}>
                    Title
                    <input
                        name='title'
                        className={`${styles.input} ${styles.taskTitle}`} 
                        type='text' 
                        placeholder='e.g. Take coffee break'
                        required
                    />
                </label>
                <label className={styles.label}>
                    Description
                    <textarea
                        name='description'
                        className={`${styles.input} ${styles.taskDescription}`} 
                        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
                    />
                </label>
                <label className={styles.label}>
                    Subtasks
                    <input name='subtask-1' className={`${styles.input} ${styles.subTask}`} required placeholder='e.g. Make coffee' />
                    <input name ='subtask-2' className={`${styles.input} ${styles.subTask}`} required placeholder='e.g. Drink coffee & smile' />
                </label>
                <label className={styles.label}>
                    Status
                    <select className={`${styles.input} ${styles.status}`} required name='column' id='column'>
                        {props.columns.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                    </select>
                </label>
                <button type='submit' className={buttonStyles.mainPurple}>Create Task</button>
            </form>
        </div>
    )
}