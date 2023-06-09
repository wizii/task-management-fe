import { ReactNode } from 'react';
import styles from '../styles/removable-input-field.module.scss';
import buttonStyles from '../styles/button.module.scss';

interface RemovableFieldProps {
    children: ReactNode;
    id: number | string;
    removeField: (id: number) => void;
}

export function RemovableField(props: RemovableFieldProps) {
    return (
        <div className={styles.fieldWrapper}>
            <div className={styles.inputFieldWrapper}>
                {props.children}
            </div>
            <button type='button' className={`${buttonStyles.button} ${styles.xButton}`} onClick={() =>props.removeField(props.id)}></button>
        </div>
    )
}