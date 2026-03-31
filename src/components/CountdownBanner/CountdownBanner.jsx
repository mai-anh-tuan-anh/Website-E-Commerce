import CountdownTimer from '@components/CountdownTimer/CountdownTimer';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
function CountdownBanner() {
    const { container, containerTimer, title, boxBtn } = styles;
    const targetDate = '2026-04-01T09:20:00';
    return (
        <div className={`${container} w-full md:w-[calc(100%/2.05)]`}>
            <div className={title}>On Special Offer</div>
            <div className={containerTimer}>
                <CountdownTimer targetDate={targetDate} />
            </div>
            <div className={boxBtn}>
                <Button content={'Buy Now'} />
            </div>
        </div>
    );
}

export default CountdownBanner;
