import styles from '../styles/sidebar-item.module.scss';
import { ReactNode } from 'react';

interface SideBarItemProps { 
    isSelected?: boolean;
    modifiers?: string[];
    children?: ReactNode;
    onClick?: () => void;
}

export default function SideBarItem(props: SideBarItemProps) {
    function classModifiers() {  
        return props.modifiers?.map(modifier => styles[`item__${modifier}`]).join(' ');
      }

    return <div className={`${styles.item} ${classModifiers()} ${props.isSelected ? styles.item__isSelected : ''}`} onClick={props.onClick}>{props.children}</div>

}