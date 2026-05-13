import styles from '../styles.module.scss';

function ProductSizeSelector({ sizes, selectedSize, onSizeSelect }) {
    const { size, active } = styles;

    if (!sizes || sizes.length === 0) return null;

    return (
        <div className={styles.boxSize}>
            {sizes.map((item, index) => (
                <div
                    key={index}
                    className={`${size} ${selectedSize === item.name ? active : ''}`}
                    onClick={(e) => onSizeSelect(e, item.name)}
                >
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default ProductSizeSelector;
