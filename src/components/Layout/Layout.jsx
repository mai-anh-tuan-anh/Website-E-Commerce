import styles from './styles.module.scss';
function MainLayout({ children }) {
    const { wrapLayout, container } = styles;
    return (
        <main className={wrapLayout}>
            <div className={`${container} px-4 lg:px-0`}>{children}</div>
        </main>
    );
}

export default MainLayout;
