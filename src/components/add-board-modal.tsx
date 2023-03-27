import { Column } from '@/lib/models/column';
import { FormEvent, useState } from 'react';
import styles from '../styles/add-task-modal.module.scss';
import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface AddBoardModalProps {
    createBoard: () => void;
}

// TODO: required fields, fix submit button
export default function AddBoardModal(props: AddBoardModalProps) {
    // [erroredFields, setErroredFields] = useState({});

    const requiredFields = ['title', 'column'];

    function validateData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        
        
        // props.createBoard(formJson);
    }

    return (
        <div className={modalStyles.modalContent}>
            <form onSubmit={validateData}>
                <div className={styles.title}>Add New Board</div>
                <label className={styles.label}>
                    Name
                    <input
                        name='name'
                        className={`${styles.input} ${styles.taskTitle}`} 
                        type='text' 
                        placeholder='e.g. Take coffee break'
                        required
                    />
                </label>
                <button type='submit' className={buttonStyles.mainPurple}>Create New Board</button>
            </form>
        </div>
    )
}