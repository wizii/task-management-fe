import styles from '@/styles/side-bar-popup.module.scss';
import { ToggleButton } from './toggle-button';
import SideBarItem from './sidebar-item';
import { useState } from 'react';
import { Logo } from './logo';

interface SideBarPopupProps {
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

export function SideBarPopup(props: SideBarPopupProps) {
    const boardCount = props.boards?.length ?? 0;
    return (
        <>
            <div className={styles.sidebar}>
            <SideBarItem modifiers={['allBoards']}>All Boards ({boardCount})</SideBarItem>
            {props.boards.map((board, index) => 
                <SideBarItem 
                    key={index}
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
            </div>
        </>
        
    )
}