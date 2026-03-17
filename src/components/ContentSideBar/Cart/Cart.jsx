import HeaderSideBar from '../components/HeaderSideBar/HeaderSideBar';
import { AiOutlineShoppingCart, AiOutlineShopping } from 'react-icons/ai';
import styles from './styles.module.scss';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const {
        container,
        boxContent,
        buttonWrapper,
        subtotalSection,
        subtotalLabel,
        subtotalPrice
    } = styles;
    const { listProductCart, setIsOpen } = useContext(SideBarContext);
    const navigate = useNavigate();

    // Tính tổng subtotal từ danh sách sản phẩm
    const calculateSubtotal = () => {
        if (!listProductCart || listProductCart.length === 0) {
            return 0;
        }

        return listProductCart.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return total + itemTotal;
        }, 0);
    };

    const subtotal = calculateSubtotal();
    const hasItems = listProductCart && listProductCart.length > 0;

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={
                        <AiOutlineShoppingCart style={{ fontSize: '30px' }} />
                    }
                    title='CART'
                />
                {hasItems ? (
                    listProductCart.map((item, index) => (
                        <ItemProduct
                            key={index}
                            src={item.images[0]}
                            nameProduct={item.name}
                            priceProduct={item.price}
                            skuProduct={item.sku}
                            sizeProduct={item.size}
                            quantity={item.quantity}
                            productId={item.productId}
                            userId={item.userId}
                        />
                    ))
                ) : (
                    <div className={styles.emptyCart}>
                        <div className={styles.emptyCartIcon}>
                            <AiOutlineShopping />
                        </div>
                        <h3 className={styles.emptyCartTitle}>
                            Bạn chưa có sản phẩm nào trong giỏ hàng
                        </h3>
                    </div>
                )}
            </div>

            {hasItems && (
                <>
                    <div className={subtotalSection}>
                        <div className={subtotalLabel}>Subtotal:</div>
                        <span className={subtotalPrice}>
                            {subtotal.toFixed(2)} $
                        </span>
                    </div>
                    <div className={buttonWrapper}>
                        <Button
                            content={'VIEW CART'}
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/view-cart');
                            }}
                        />
                        <Button
                            content={'CHECKOUT'}
                            onClick={() => {
                                setIsOpen(false);
                                navigate('/checkout');
                            }}
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
