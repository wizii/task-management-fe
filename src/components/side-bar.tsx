import styles from '@/styles/side-bar.module.scss';
import { LogoIcon } from '../components/logo-icon';
import { ToggleButton } from './toggle-button';
import SideBarItem from './sidebar-item';

interface SideBarProps {
    boards: [
        {
            isSelected: boolean;
            name: string;
            columns: [{
                name: string;
                tasks: [{
                    name: string;
                }]
            }]
        }
    ]
}

export function SideBar(props: SideBarProps) {
    const boardCount = props.boards.length; 
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <LogoIcon theme='light'></LogoIcon>
                Kanban
            </div>
            <SideBarItem isActive={true} modifiers='allBoards'>All Boards ({boardCount})</SideBarItem>
            {props.boards.map(board => 
                <SideBarItem key={board.name} isActive={board.isSelected} isBoardLink={true} modifiers=''>{board.name}</SideBarItem>
            )}
            
            <div className={styles.sidebar_footer}>
                <div className={`${styles.sidebar_item} ${styles.toggleTheme}`}>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__sun}`}></div>
                    <ToggleButton></ToggleButton>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__moon}`}></div>
                </div>
                <SideBarItem modifiers='hideSidebar'>Hide Sidebar</SideBarItem>
            </div>
        </div>
    )
}