import styles from '../styles.module.scss';
import fbicon from '@icon/svgs/fbicon.svg';
function BoxIcon({ type, href }) {
    const { boxIcon } = styles;
    return (
        <div className={boxIcon}>
            <img src={fbicon} alt={type} />
        </div>
    );
}

export default BoxIcon;
