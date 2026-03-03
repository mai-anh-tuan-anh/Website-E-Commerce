import styles from '../styles.module.scss';
function Menu({ content, href }) {
    const { menu } = styles;
    return (
        <a className={menu} href={href}>
            {content}
        </a>
    );
}

export default Menu;
