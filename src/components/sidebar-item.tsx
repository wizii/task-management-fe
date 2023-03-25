import styles from '../styles/sidebar-item.module.scss';
import { ReactNode } from 'react';

interface SideBarItemProps {
    isActive?: boolean;
    isBoardLink?: boolean;
    modifiers?: string;
    children?: ReactNode;
}

export default function SideBarItem(props: SideBarItemProps) {
    // let modifiers = styles[props.modifiers]
    return <div className={`${styles.item} ${props.isBoardLink ? styles.boardLink : ''}`}>{props.children}</div>

}