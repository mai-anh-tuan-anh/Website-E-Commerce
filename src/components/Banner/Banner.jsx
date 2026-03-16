import styles from './styles.module.scss';
import Button from '@components/Button/Button.jsx';
import { useNavigate } from 'react-router-dom';

function Banner() {
    const { container, content, title, description } = styles;
    const navigate = useNavigate();

    const handleGoToShop = () => {
        navigate('/shop');
    };

    return (
        <div className={container}>
            <div className={content}>
                <h1 className={title}>Divine Beauty</h1>
                <div className={description}>Your style, your rules!</div>
                <Button content={'Go to shop'} onClick={handleGoToShop} />
            </div>
        </div>
    );
}

export default Banner;
