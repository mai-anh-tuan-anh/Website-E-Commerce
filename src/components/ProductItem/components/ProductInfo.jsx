import styles from '../styles.module.scss';

function ProductInfo({ name, price }) {
    const { priceBoard, title, priceTitle } = styles;

    return (
        <div className={priceBoard}>
            <div className={title}>{name}</div>
            <div className={priceTitle}>{price}$</div>
        </div>
    );
}

export default ProductInfo;
