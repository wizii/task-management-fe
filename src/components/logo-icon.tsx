import styles from '../styles/logo-icon.module.css';

interface LogoIconProps {
    theme: 'light' | 'dark';
}

export function LogoIcon(props: LogoIconProps) {
    return (
        <div className={styles.container}>
            <div className={styles.rectangle}></div>
            <div className={`${styles.rectangle} ${styles.rectangleTwo}`}></div>
            <div className={`${styles.rectangle} ${styles.rectangleThree}`}></div>
        </div>
    )
}