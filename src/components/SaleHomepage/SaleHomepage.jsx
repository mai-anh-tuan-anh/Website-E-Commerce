import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import ptr1 from '@images/pic2 (1).jpg';
import ptr2 from '@images/pic3.jpg';

function SaleHomepage() {
    const { container, title, des, boxBtn, boxImage, pic } = styles;

    return (
        <div
            className={`${container} mt-20 flex flex-col items-center justify-between gap-6 md:mt-24 md:flex-row`}
        >
            <div className={`${boxImage} w-full mt-20`}>
                <img
                    src={ptr1}
                    alt=''
                    className={`${pic} h-auto w-full max-w-[356px] rounded-[5px] object-cover md:h-[400px] md:w-[356px]`}
                    data-aos='fade-right'
                    data-aos-delay='500'
                />
            </div>
            <div className='text-center'>
                <h2
                    className={`${title} text-[26px] md:text-[35px]`}
                    data-aos='fade-up'
                    data-aos-delay='500'
                >
                    Sale Of The Year
                </h2>
                <p
                    className={`${des} mx-auto max-w-[460px] text-[16px] leading-[22px] md:text-[20px] md:leading-[25px]`}
                    data-aos='fade-up'
                    data-aos-delay='500'
                >
                    Getting a discount up to 50% off
                </p>
                <div
                    className={`${boxBtn} mt-[18px] md:mt-[35px]`}
                    data-aos='fade-up'
                    data-aos-delay='700'
                >
                    <Button content={'Read More'} />
                </div>
            </div>
            <div className={`${boxImage} w-full`}>
                <img
                    src={ptr2}
                    alt=''
                    className={`${pic} h-auto w-full max-w-[356px] rounded-[5px] object-cover md:h-[400px] md:w-[356px]`}
                    data-aos='fade-left'
                    data-aos-delay='500'
                />
            </div>
        </div>
    );
}

export default SaleHomepage;
