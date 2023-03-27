import styles from '../styles/sidebar-item.module.scss';
import { ReactNode } from 'react';

interface SideBarItemProps { 
    isActive?: boolean;
    modifiers?: string[];
    children?: ReactNode;
    onClick?: () => void;
}

export default function SideBarItem(props: SideBarItemProps) {
    function classModifiers() {  
        let classes =props.modifiers?.map(modifier => styles[`item__${modifier}`]).join(' ');
        return classes;
      }

    return <div className={`${styles.item} ${classModifiers()}`} onClick={props.onClick}>{props.children}</div>

}