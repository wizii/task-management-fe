import styles from '@/styles/side-bar.module.scss';
import { LogoIcon } from '../components/logo-icon';
import { ToggleButton } from './toggle-button';
import SideBarItem from './sidebar-item';

interface SideBarProps {
    handleSelectedBoard: (id: number) => void;
    activeBoardId: number;
    boards: [
        {            
            name: string;
            id: number;
            columns: [{
                name: string;
                tasks: [{
                    name: string;
                }]
            }]
        }
    ]
    handleOpenAddBoardModal: () => void;
}

// TODO: Fix logo, Fix checkbox, active state of selected board,hide sidebar
export function SideBar(props: SideBarProps) {
    const boardCount = props.boards?.length ?? 0; 
    return (
        <div className={styles.sidebar}>
            <div className={styles.logo}>
                <LogoIcon theme='light'></LogoIcon>
                Kanban
            </div>
            <SideBarItem modifiers={['allBoards']}>All Boards ({boardCount})</SideBarItem>
            {props.boards.map(board => 
                <SideBarItem 
                    key={board.name}
                    isSelected={board.id === props.activeBoardId}
                    modifiers={['hasIcon', 'boardLink']}
                    onClick={() => props.handleSelectedBoard(board.id)}
                >
                    {board.name}
                </SideBarItem>
            )}

            <SideBarItem modifiers={['hasIcon', 'createBoardLink']} onClick={props.handleOpenAddBoardModal}>+ Create New Board</SideBarItem>
            
            <div className={styles.sidebar_footer}>
                <div className={`${styles.sidebar_item} ${styles.toggleTheme}`}>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__sun}`}></div>
                    <ToggleButton></ToggleButton>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__moon}`}></div>
                </div>
                <SideBarItem modifiers={['hasIcon', 'hideSidebar']}>Hide Sidebar</SideBarItem>
            </div>
        </div>
    )
}