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
        <div
            className={`${container} min-h-[460px] md:min-h-[520px] lg:min-h-[800px]`}
        >
            <div className={content}>
                <h1
                    className={`${title} text-[30px] md:text-[34px] lg:text-[50px]`}
                >
                    Divine Beauty
                </h1>
                <div
                    className={`${description} text-[16px] md:text-[18px] lg:text-[25px]`}
                >
                    Your style, your rules!
                </div>
                <Button content={'Go to shop'} onClick={handleGoToShop} />
            </div>
        </div>
    );
}

export default Banner;
