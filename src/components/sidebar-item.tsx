import styles from '../styles/side-bar.module.css';
import { ReactNode } from 'react';

interface SideBarItemProps {
    isActive: boolean;
    modifiers: string;
    children?: ReactNode;
}

export default function SideBarItem(props: SideBarItemProps) {
    return <div className={`${styles.item} ${styles.modifiers}`}>{props.children}</div>

}