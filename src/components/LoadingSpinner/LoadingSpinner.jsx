import styles from './styles.module.scss';

function LoadingSpinner() {
    return (
        <div className={styles.container}>
            <div className={styles.spinner}></div>
            <p className={styles.text}>Loading...</p>
        </div>
    );
}

export default LoadingSpinner;
