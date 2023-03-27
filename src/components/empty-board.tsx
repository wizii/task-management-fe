import styles from '../styles/board.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface EmptyBoardProps {
    handleAddColumn: () => void;
}

export function EmptyBoard(props: EmptyBoardProps) {
    return (
        <div className={`${styles.board} ${styles.board__isEmpty}`}>
            <div className={styles.emptyBoardTextWrapper}>
                <div className={styles.emptyBoardText}>
                    This board is empty. Create a new column to get started.
                </div>
                <button 
                    type='button'
                    onClick={props.handleAddColumn}
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__mainPurple} 
                        ${buttonStyles.button__height48}
                        ${buttonStyles.button__width174}
                    `}
                >
                    + Add New Column
                </button>
            </div>
            

        </div>
    )
}