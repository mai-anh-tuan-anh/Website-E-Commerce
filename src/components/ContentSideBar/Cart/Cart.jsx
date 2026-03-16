import HeaderSideBar from '../components/HeaderSideBar/HeaderSideBar';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import styles from './styles.module.scss';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
function Cart() {
    const {
        container,
        boxContent,
        buttonWrapper,
        subtotalSection,
        subtotalLabel,
        subtotalPrice
    } = styles;
    const { listProductCart } = useContext(SideBarContext);

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={
                        <AiOutlineShoppingCart style={{ fontSize: '30px' }} />
                    }
                    title='CART'
                />
                {listProductCart &&
                    listProductCart.length > 0 &&
                    listProductCart.map((item, index) => (
                        <ItemProduct
                            key={index}
                            src={item.images[0]}
                            nameProduct={item.name}
                            priceProduct={item.price}
                            skuProduct={item.sku}
                            sizeProduct={item.size}
                            quantity={item.quantity}
                        />
                    ))}
            </div>
            <div className={subtotalSection}>
                <div className={subtotalLabel}>Subtotal:</div>
                <div className={subtotalPrice}>$119.99</div>
            </div>
            <div className={buttonWrapper}>
                <Button content={'VIEW CART'} />
                <Button content={'CHECKOUT'} />
            </div>
        </div>
    );
}

export default Cart;
