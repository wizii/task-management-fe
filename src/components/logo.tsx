import styles from '../styles/logo.module.scss';
import { LogoIcon } from './logo-icon';

export function Logo() {
    return (
        <div className={styles.logo}>
            <LogoIcon theme='light'></LogoIcon>
            <img src='/icons/logo.svg' alt='kanban' />
        </div>
    )
}