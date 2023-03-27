import { Column } from '@/lib/models/column';
import { FormEvent, useState } from 'react';
import styles from '../styles/add-board-modal.module.scss';
import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';
import { RemovableField } from './removable-input-field';

interface AddColumnModalProps {
    createColumn: () => void;
}

// TODO: required fields, color picker css
export default function AddColumnModal(props: AddColumnModalProps) {
    const [columnCount, setColumnCount] = useState(1);
    const [columns, setColumns] = useState([{ id: 1, name: ''}]);
    // [erroredFields, setErroredFields] = useState({});

    const requiredFields = ['title', 'column'];

    function validateData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        props.createColumn(formJson);
    }

    return (
        <form onSubmit={validateData}>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}> Name </div>
                <input
                    name='name'
                    className={`${modalStyles.input} ${styles.taskTitle}`} 
                    type='text' 
                    placeholder='e.g. Todo'
                    required
                />
            </div>
            <div className={modalStyles.section}>
                <div className={modalStyles.label}> Color </div>
                <input type="color" name='color'></input>
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
                    Create New Column
                </button>
            </div>
        </form>
    )
}