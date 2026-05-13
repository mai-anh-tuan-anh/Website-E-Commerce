import styles from '../styles.module.scss';
import bagIcon from '@icons/svgs/bagicon.svg';
import eyeIcon from '@icons/svgs/eyeicon.svg';
import rotateIcon from '@icons/svgs/rotateicon.svg';
import wishIcon from '@icons/svgs/wishicon.svg';

function ProductActions({
    onAddToCart,
    onAddToWishlist,
    onAddToCompare,
    onQuickView,
    isInWishlist,
    isInCompare
}) {
    const { boxIcon, showFcWhenHover } = styles;

    return (
        <div className={showFcWhenHover}>
            <div className={boxIcon} onClick={onAddToCart}>
                <img src={bagIcon} alt='' />
                <span className={styles.iconTooltip}>Add to cart</span>
            </div>
            <div
                className={`${boxIcon} ${isInWishlist ? styles.activeIcon : ''}`}
                onClick={onAddToWishlist}
            >
                <img src={wishIcon} alt='' />
                <span className={styles.iconTooltip}>
                    {isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                </span>
            </div>
            <div
                className={`${boxIcon} ${isInCompare ? styles.activeIcon : ''}`}
                onClick={onAddToCompare}
            >
                <img src={rotateIcon} alt='' />
                <span className={styles.iconTooltip}>
                    {isInCompare ? 'Remove from compare' : 'Add to compare'}
                </span>
            </div>
            <div className={boxIcon} onClick={onQuickView}>
                <img src={eyeIcon} alt='' />
                <span className={styles.iconTooltip}>Quick Review</span>
            </div>
        </div>
    );
}

export default ProductActions;
