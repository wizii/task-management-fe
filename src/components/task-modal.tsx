import { Column } from '@/lib/models/column';
import modalStyles from '../styles/modal.module.scss';
import { ColumnSelector } from './column-selector';

interface TaskModalProps {
    name: string;
    description: string;
    selectedColumnId: number;
    columns: Column[]
}

export function TaskModal({name, description, selectedColumnId, columns}: TaskModalProps) {
    return (
        <div className={modalStyles.modalContent}>
            <div className={modalStyles.section}>{name}</div>
            <div className={modalStyles.section}>{description}</div>
            <div className={modalStyles.section}>{selectedColumnId}</div>
            <ColumnSelector columns={columns} selectedColumnId={selectedColumnId}></ColumnSelector>
        </div>
    )
}