import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
function ItemProduct({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantity
}) {
    const { container, boxContent, title, price, boxClose, size, sku } = styles;
    return (
        <div className={container}>
            <img src={src} alt='img' />
            <div className={boxClose}>
                <IoIosCloseCircleOutline style={{ fontSize: '20px' }} />
            </div>
            <div className={boxContent}>
                <div className={title}>{nameProduct}</div>
                <div className={size}>Size: {sizeProduct}</div>
                <div className={sku}>SKU: {skuProduct}</div>
                <div className={price}>
                    Price: {quantity} x {priceProduct}$
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
