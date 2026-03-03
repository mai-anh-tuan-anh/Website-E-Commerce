import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import ptr1 from '@images/pic2 (1).jpg';
import ptr2 from '@images/pic3.jpg';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
function SaleHomepage() {
    const { container, title, des, boxBtn, boxImage, pic } = styles;

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <div className={container}>
            <div className={boxImage}>
                <img src={ptr1} alt='' className={pic} data-aos='fade-right' />
            </div>
            <div>
                <h2 className={title} data-aos='fade-up'>
                    Sale Of The Year
                </h2>
                <p className={des} data-aos='fade-up' data-aos-delay='200'>
                    Getting a discount up to 50% off
                </p>
                <div className={boxBtn}>
                    <Button content={'Read More'} />
                </div>
            </div>
            <div className={boxImage}>
                <img src={ptr2} alt='' className={pic} data-aos='fade-left' />
            </div>
        </div>
    );
}

export default SaleHomepage;
