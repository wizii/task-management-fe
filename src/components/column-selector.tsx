import { Column } from "@/lib/models/column";

interface SelectorProps {
    columns: Column[];
    classModifiers: string;
    selectedColumnId?: number;
}

export function ColumnSelector(props: SelectorProps) {
    return (
        <select className='' name='column' id='column'>
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
    );
}