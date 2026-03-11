import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import ptr1 from '@images/pic2 (1).jpg';
import ptr2 from '@images/pic3.jpg';

function SaleHomepage() {
    const { container, title, des, boxBtn, boxImage, pic } = styles;

    return (
        <div className={container}>
            <div className={boxImage}>
                <img
                    src={ptr1}
                    alt=''
                    className={pic}
                    data-aos='fade-right'
                    data-aos-delay='500'
                />
            </div>
            <div>
                <h2 className={title} data-aos='fade-up' data-aos-delay='500'>
                    Sale Of The Year
                </h2>
                <p className={des} data-aos='fade-up' data-aos-delay='500'>
                    Getting a discount up to 50% off
                </p>
                <div className={boxBtn} data-aos='fade-up' data-aos-delay='700'>
                    <Button content={'Read More'} />
                </div>
            </div>
            <div className={boxImage}>
                <img
                    src={ptr2}
                    alt=''
                    className={pic}
                    data-aos='fade-left'
                    data-aos-delay='500'
                />
            </div>
        </div>
    );
}

export default SaleHomepage;
