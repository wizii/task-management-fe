import modalStyles from '../styles/modal.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface DeleteTaskModalProps {
    taskName: string;
    handleCancel: () => void;
    handleDelete: () => void;
}

export function DeleteTaskModal({taskName, handleCancel, handleDelete}: DeleteTaskModalProps) {
    return (
        <div>
            <div className={modalStyles.section}>
                <div className={modalStyles.text}>
                    Are you sure you want to delete the '{taskName}' and its subtasks? This action cannot be reversed.
                </div>
            </div>
            <div className={modalStyles.section}>
                <div className={modalStyles.buttonsContainer}>
                    <button 
                        type='button' 
                        className={`${buttonStyles.button} ${buttonStyles.button__width200} ${buttonStyles.button__red} ${buttonStyles.button__height40}`}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <button
                        type='button'
                        className={`${buttonStyles.button} ${buttonStyles.button__width200} ${buttonStyles.button__fadedPurple} ${buttonStyles.button__height40}`}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}