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
    const [columnCount, setColumnCount] = useState(1);
    const [columns, setColumns] = useState([{ id: 1, name: ''}]);
    // [erroredFields, setErroredFields] = useState({});

    const requiredFields = ['title', 'column'];

    function validateData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        let form = e.target as HTMLFormElement;
        let formData = new FormData(form);
        let formJson = Object.fromEntries(formData.entries());
        
        // props.createBoard(formJson);
    }

    function addColumn() {
        setColumnCount(columnCount + 1);
        setColumns([...columns, { id: columnCount + 1, name: '' }]);
    }

    function removeColumn(id: number) {
        let remainingColumns = columns.filter(col => col.id !== id);
        setColumns(remainingColumns);
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
            {columns.length ? 
                <div className={modalStyles.section}>
                <div className={modalStyles.label}>Columns</div>
                {columns.map(col => (
                    <RemovableField key={col.id} removeField={removeColumn} id={col.id}>
                        <input 
                            type='text'
                            name={`column-${col.id}`}
                            id={`column-${col.id}`}
                            className={modalStyles.input} 
                            placeholder='e.g. Todo'
                        />
                    </RemovableField>
                ))} 
                </div>
                : ''
            }
            
            <div className={modalStyles.section}>
                <button 
                    type='button'
                    onClick={addColumn}
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__fadedPurple} 
                        ${buttonStyles.button__height40}
                        ${buttonStyles.button__isInModal}
                    `}
                >
                    + Add New Column
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