import styles from './styles.module.scss';
import pic2_1 from '@images/pic2 (1).jpg';
import pic2_2 from '@images/pic2 (2).jpg';
import bagIcon from '@icons/svgs/bagicon.svg';
import eyeIcon from '@icons/svgs/eyeicon.svg';
import rotateIcon from '@icons/svgs/rotateicon.svg';
import wishIcon from '@icons/svgs/wishicon.svg';
import BoxIcon from '@components/Header/BoxIcon/BoxIcon';
function ProductItem({ src, prevSrc, name, price }) {
    const {
        container,
        boxImg,
        revealWhenHover,
        showFcWhenHover,
        boxIcon,
        title,
        priceBoard,
        priceTitle
    } = styles;
    return (
        <div className={container}>
            <div className={boxImg}>
                <img src={pic2_1} alt='' />
                <img src={pic2_2} alt='' className={revealWhenHover} />
                <div className={showFcWhenHover}>
                    <div className={boxIcon}>
                        <img src={bagIcon} alt='' />
                        <span className={styles.iconTooltip}>Add to cart</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={wishIcon} alt='' />
                        <span className={styles.iconTooltip}>Favorite</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={rotateIcon} alt='' />
                        <span className={styles.iconTooltip}>Compare</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={eyeIcon} alt='' />
                        <span className={styles.iconTooltip}>Review</span>
                    </div>
                </div>
            </div>
            <div className={priceBoard}>
                <div className={title}>10K Gold</div>
                <div className={priceTitle}>69$</div>
            </div>
        </div>
    );
}

export default ProductItem;
