import { Column } from '@/lib/models/column';
import styles from '../styles/add-task-modal.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface AddTaskModalProps {
    columns: Column[];
    createTask: () => void;
}

export default function AddTaskModal(props: AddTaskModalProps) {
    const data = {
        name: 'sara'
    }
    return (
        <div className={styles.modal}>
            <form onSubmit={props.createTask}>
                <div className={styles.title}>Add New Task</div>
                <label className={styles.label}>
                    Title
                    <input
                        name='title'
                        className={`${styles.input} ${styles.taskTitle}`} 
                        type='text' 
                        placeholder='e.g. Take coffee break'
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
                    <input name='subtask-1' className={`${styles.input} ${styles.subTask}`} placeholder='e.g. Make coffee' />
                    <input name ='subtask-2' className={`${styles.input} ${styles.subTask}`} placeholder='e.g. Drink coffee & smile' />
                </label>
                <label className={styles.label}>
                    Status
                    <select className={`${styles.input} ${styles.status}`} name='column' id='column'>
                        {props.columns.map(({name, id}) => <option key={id} value={id}>{name}</option>)}
                    </select>
                </label>
                <button type='submit' className={buttonStyles.mainPurple}>Create Task</button>
            </form>
        </div>
    )
}