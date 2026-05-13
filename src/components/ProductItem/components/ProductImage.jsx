import styles from '../styles.module.scss';
import ProductActions from './ProductActions';

function ProductImage({
    src,
    prevSrc,
    onAddToCart,
    onAddToWishlist,
    onAddToCompare,
    onQuickView,
    isInWishlist,
    isInCompare
}) {
    const { boxImg, revealWhenHover } = styles;

    return (
        <div className={boxImg}>
            <img src={src} alt='' />
            <img src={prevSrc} alt='' className={revealWhenHover} />
            <ProductActions
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                onAddToCompare={onAddToCompare}
                onQuickView={onQuickView}
                isInWishlist={isInWishlist}
                isInCompare={isInCompare}
            />
        </div>
    );
}

export default ProductImage;
