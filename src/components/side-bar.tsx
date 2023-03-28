import styles from '@/styles/side-bar.module.scss';
import { ToggleButton } from './toggle-button';
import SideBarItem from './sidebar-item';
import { useState } from 'react';
import { Logo } from './logo';

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
    toggleSideBar: (value: boolean) => void;
}

export function SideBar(props: SideBarProps) {
    const [isSideBarVisible, setIsSideBarVisible] = useState(true);
    const boardCount = props.boards?.length ?? 0;

    function toggleSideBar(value: boolean) {
        setIsSideBarVisible(value);
        props.toggleSideBar(value);
    }

    return (
        <>
        {isSideBarVisible ? 
            <div className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <Logo></Logo>
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
                <SideBarItem modifiers={['toggleTheme']}>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__sun}`}></div>
                        <ToggleButton></ToggleButton>
                    <div className={`${styles.themeIcon} ${styles.themeIcon__moon}`}></div>
                </SideBarItem>
                </div>
                <SideBarItem modifiers={['hasIcon', 'hideSidebar']} onClick={() => toggleSideBar(false)}>Hide Sidebar</SideBarItem>
            </div>
         : <div className={styles.showSideBar} onClick={() => toggleSideBar(true)}>
            <div className={styles.showSideBarIcon}></div>
         </div>
        }
        </>
        
    )
}