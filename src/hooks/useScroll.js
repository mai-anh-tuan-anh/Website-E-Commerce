import { useState, useEffect, useRef } from 'react';
import { SCROLL_THRESHOLD } from '@/constants/appConstants';

function useScroll(threshold = SCROLL_THRESHOLD) {
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollYRef = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const lastY = lastScrollYRef.current;

            if (currentScrollY > lastY && currentScrollY > threshold) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return isVisible;
}

export default useScroll;
