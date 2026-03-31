import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';
function CountdownTimer({ targetDate }) {
    const { box, title } = styles;
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();
        if (difference > 0) {
            return {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Mins: Math.floor((difference / 1000 / 60) % 60),
                Secs: Math.floor((difference / 1000) % 60)
            };
        }

        return {
            Days: 0,
            Hours: 0,
            Mins: 0,
            Secs: 0
        };
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });
    const formatNumber = (number) => {
        return String(number).padStart(2, '0');
    };
    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (timeLeft[interval] !== undefined) {
            timerComponents.push(
                <span key={interval} className={`${box} p-2 md:p-[10px]`}>
                    {formatNumber(timeLeft[interval])}{' '}
                    <span className={`${title} text-[16px] md:text-[18px]`}>
                        {interval}
                    </span>{' '}
                </span>
            );
        }
    });
    return timerComponents;
}

export default CountdownTimer;
