import { Column } from '@/lib/models/column';
import { Task } from '@/lib/models/task';
import modalStyles from '../styles/modal.module.scss';
import styles from '../styles/task-modal.module.scss';
import { ColumnSelector } from './column-selector';

interface TaskModalProps {
    name: string;
    description: string;
    selectedColumnId: number;
    subtasks: Task[];
    columns: Column[]
}

export function TaskModal({name, description, selectedColumnId, subtasks, columns}: TaskModalProps) {
    return (
        <div className={modalStyles.modalContent}>
            <div className={`${modalStyles.section} ${styles.name}`}>{name}</div>
            <div className={`${modalStyles.section} ${styles.description}`}>{description}</div>
            {subtasks.length &&
                <div className={`${modalStyles.section} ${styles.subtasks}`}>
                    <div className={`${styles.label} ${styles.label__marginBottom16}`}>Subtasks (completed of {subtasks.length})</div>
                    {subtasks.map(subtask => (
                        <div key={subtask.id} className={styles.subtaskListItem}>
                            <input type='checkbox' className={styles.subtaskCheckBox} />{subtask.name}
                        </div>
                    ))
                    }
                </div>
            }
            <div className={modalStyles.section}>
                <div className={`${styles.label} ${styles.label__marginBottom8}`}>Current Status</div>
                <ColumnSelector columns={columns} selectedColumnId={selectedColumnId}></ColumnSelector>
            </div>
        </div>
    )
}