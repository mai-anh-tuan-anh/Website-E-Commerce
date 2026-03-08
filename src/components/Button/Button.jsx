import styles from './styles.module.scss';
function Button({ content, ...props }) {
    const { btn } = styles;
    return (
        <button className={btn} {...props}>
            {content}
        </button>
    );
}

export default Button;
