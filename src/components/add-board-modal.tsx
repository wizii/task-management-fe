import { Column } from '@/lib/models/column';
import { FormEvent, useState } from 'react';
import styles from '../styles/add-board-modal.module.scss';
import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';
import { RemovableField } from './removable-input-field';

interface AddBoardModalProps {
    createBoard: () => void;
}

// TODO: required fields
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
        <form onSubmit={validateData}>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}> Name </div>
                <input
                    name='name'
                    className={`${modalStyles.input} ${styles.taskTitle}`} 
                    type='text' 
                    placeholder='e.g. Web Design'
                    required
                />
            </div>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}>Columns</div>
                    <RemovableField>
                        <input 
                            type="text"
                            name="column-1"
                            id="column-1" 
                            className={modalStyles.input} 
                        />
                    </RemovableField>
                </div>
            <div className={modalStyles.section}>
                <button 
                    type='button'
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__fadedPurple} 
                        ${buttonStyles.button__height40}
                        ${buttonStyles.button__isInModal}
                    `}
                >
                    Add New Column
                </button>
                </div>
            <div className={modalStyles.section}>
                <button 
                    type='submit'
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__mainPurple} 
                        ${buttonStyles.button__height40}
                        ${buttonStyles.button__isInModal}
                    `}
                >
                    Create New Board
                </button>
            </div>
        </form>
    )
}