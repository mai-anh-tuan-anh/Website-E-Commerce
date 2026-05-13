import styles from '../styles.module.scss';

function RememberMeCheckbox({ checked, onChange }) {
    const { boxRememberMe } = styles;

    return (
        <div className={boxRememberMe}>
            <input
                type='checkbox'
                id='rememberMe'
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor='rememberMe'>Remember me</label>
        </div>
    );
}

export default RememberMeCheckbox;
