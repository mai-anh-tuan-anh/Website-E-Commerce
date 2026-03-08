import styles from './styles.module.scss';
function HeaderSideBar({ icon, title }) {
    const { container, titleClass } = styles;
    return (
        <div className={container}>
            {icon}
            <div className={titleClass}>{title}</div>
        </div>
    );
}

export default HeaderSideBar;
