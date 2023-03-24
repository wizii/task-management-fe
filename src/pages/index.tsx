import Head from 'next/head'
import Styles from '../styles/main.module.css';
import { SideBar } from '../components/side-bar';
import { BoardHeader } from '../components/board-header';
import { Board } from '../components/board';

export default function Home() {
  return (
    <div>
        <Head>
          <title>Full Stack Book To Do</title>
          <meta name="description" content="Full Stack Book To Do" />
          <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={Styles.container}>
        <SideBar></SideBar>
        <div className={Styles.boardContainer}>
            <BoardHeader boardName='Current Board'></BoardHeader>
            <div className={Styles.board}>
                <Board name='Board Name'></Board>
            </div>
        </div>
    </div>
    </div>
 )
}