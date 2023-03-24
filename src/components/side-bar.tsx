import styles from '../styles/side-bar.module.css';
import { LogoIcon } from '../components/logo-icon';
import { ToggleButton } from './toggle-button';
import SideBarItem from './sidebar-item';

export function SideBar() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <LogoIcon theme='light'></LogoIcon>
                Kanban
            </div>
            <SideBarItem isActive={true} modifiers='allBoards'>All Boards (3)</SideBarItem>
            
            <div className={styles.sidebar_footer}>
                <div className={`${styles.sidebar_item} ${styles.toggleTheme}`}>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__sun}`}></div>
                    <ToggleButton></ToggleButton>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__moon}`}></div>
                </div>
                <div className={`${styles.sidebar_item} ${styles.hideSidebar}`}>Hide Sidebar</div>
            </div>
        </div>
    )
}