import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useNavigate } from 'react-router-dom';

function CountdownBanner() {
    const { container, containerTimer, title, boxBtn } = styles;
    const navigate = useNavigate();
    const targetDate = '2026-06-01T09:20:00';
    return (
        <div className={`${container} w-full md:w-[calc(100%/2.05)]`}>
            <div className={title}>On Special Offer</div>
            <div className={containerTimer}>
                <CountdownTimer targetDate={targetDate} />
            </div>
            <div className={boxBtn}>
                <Button
                    content={'Buy Now'}
                    onClick={() => navigate('/view-cart')}
                />
            </div>
        </div>
    );
}

export default CountdownBanner;
