import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { Navigate, useNavigate } from 'react-router-dom';
function Banner() {
    const { containerBanner, contentBox, boxBtn, countdown, title } = styles;
    const targetDate = new Date('2026-04-01T09:20:00');
    const navigate = useNavigate();
    return (
        <>
            <div className={containerBanner}>
                <div className={contentBox}>
                    <div className={title}>Flash Sale</div>
                    <div className={countdown}>
                        <CountdownTimer targetDate={targetDate} />
                    </div>
                    <div className={boxBtn}>
                        <Button
                            content='Buy Now'
                            onClick={() => navigate('/view-cart')}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Banner;
