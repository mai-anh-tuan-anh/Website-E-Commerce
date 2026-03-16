import { deleteItem } from '@/apis/cartService';
import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useContext, useState } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
function ItemProduct({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantity,
    productId,
    userId
}) {
    const { container, boxContent, title, price, boxClose, size, sku } = styles;
    const [isDelete, setIsDelete] = useState(false);
    const { handleGetListProductsCart } = useContext(SideBarContext);
    const handleRemoveItems = () => {
        if (!userId) {
            console.error('No userId provided for item removal');
            return;
        }

        setIsDelete(true);
        deleteItem({ productId, userId })
            .then((res) => {
                handleGetListProductsCart(userId, 'cart');
            })
            .catch((err) => {
                console.error('Error removing item:', err);
            })
            .finally(() => {
                setIsDelete(false);
            });
    };
    return (
        <div className={container}>
            <img src={src} alt='img' />
            <div className={boxClose} onClick={handleRemoveItems}>
                {isDelete ? (
                    <LoadingSpinner size='small' />
                ) : (
                    <IoIosCloseCircleOutline style={{ fontSize: '20px' }} />
                )}
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
