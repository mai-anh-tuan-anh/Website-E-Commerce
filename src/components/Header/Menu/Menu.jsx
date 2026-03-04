import styles from '../styles.module.scss';
function Menu({ content, href, setIsOpen }) {
    const { menu } = styles;
    return (
        <a className={menu} onClick={() => setIsOpen(true)}>
            {content}
        </a>
    );
}

export default Menu;
