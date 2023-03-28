import styles from '../styles/board.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface EmptyBoardProps {
    handleAdd: () => void;
    text: string;
    buttonText: string;
}

export function EmptyBoard(props: EmptyBoardProps) {
    return (
        <div className={`${styles.board} ${styles.board__isEmpty}`}>
            <div className={styles.emptyBoardTextWrapper}>
                <div className={styles.emptyBoardText}>
                    {props.text}
                </div>
                <button 
                    type='button'
                    onClick={props.handleAdd}
                    className={`
                        ${buttonStyles.button}
                        ${buttonStyles.button__mainPurple} 
                        ${buttonStyles.button__height48}
                        ${buttonStyles.button__width174}
                    `}
                >
                    {props.buttonText}
                </button>
            </div>
            

        </div>
    )
}