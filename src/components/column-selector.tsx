import { Column } from "@/lib/models/column";
import styles from '../styles/column-selector.module.scss';

interface SelectorProps {
    columns: Column[];
    classModifiers: string;
    selectedColumnId?: number;
}

export function ColumnSelector(props: SelectorProps) {
    return (
        <div className={styles.selectWrapper}>
            <select className={styles.select} name='column' id='column'>
            {props.columns.map(({name, id}) => 
                <option 
                    key={id}
                    value={id}
                    selected={id === props.selectedColumnId}
                >
                    {name}
                </option>
            )}
        </select>
        </div>
    );
}