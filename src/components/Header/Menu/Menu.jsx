import styles from '../styles.module.scss';
function Menu({ content, href, setIsOpen }) {
    const { menu } = styles;
    const handleClick = (e) => {
        if (setIsOpen) {
            setIsOpen(true);
        }
    };
    return (
        <a className={menu} href={href} onClick={handleClick}>
            {content}
        </a>
    );
}

export default Menu;
