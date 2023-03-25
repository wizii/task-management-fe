import { useState } from 'react'
import styles from '@/styles/toggle-button.module.scss';

export function ToggleButton() {
    const [isToggled, toggle] = useState(false);

    const changeTheme = () => {
        toggle(!isToggled)
    }

    return (
        <label className={styles.switch}>
            <input className={styles.checkbox} type="checkbox" defaultChecked={isToggled} onClick={changeTheme} />
            <span className={styles.slider}></span>
        </label>
    )
}