import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
function Banner() {
    const { container, content, title, description } = styles;
    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>Divine Beauty</h1>
                <div className={description}>Your style, your rules!</div>
                <Button content={'Go to shop'} />
            </div>
        </div>
    );
}

export default Banner;
