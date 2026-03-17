import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AiOutlineShoppingCart,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineDelete,
    AiOutlineArrowLeft,
    AiOutlineUser,
    AiOutlineFileDone
} from 'react-icons/ai';
import { SideBarContext } from '@contexts/SideBarProvider';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';

function ViewCart() {
    const navigate = useNavigate();
    const { listProductCart, updateCartItemQuantity, removeCartItem } =
        useContext(SideBarContext);
    const [quantities, setQuantities] = useState({});
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponApplied, setCouponApplied] = useState(false);

    const calculateSubtotal = () => {
        if (!listProductCart || listProductCart.length === 0) return 0;
        return listProductCart.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return total + itemTotal;
        }, 0);
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal > 100 ? 0 : 10; // Free shipping over $100
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = calculateShipping();
        const tax = subtotal * 0.08;
        return subtotal + shipping + tax - discount;
    };

    const applyCoupon = () => {
        const subtotal = calculateSubtotal();
        let discountAmount = 0;
        let message = '';

        // Mock coupon codes
        switch (couponCode.toUpperCase()) {
            case 'SAVE10':
                discountAmount = subtotal * 0.1;
                message = 'Coupon applied: 10% off!';
                break;
            case 'SAVE20':
                discountAmount = subtotal * 0.2;
                message = 'Coupon applied: 20% off!';
                break;
            case 'FREESHIP':
                discountAmount = calculateShipping();
                message = 'Coupon applied: Free shipping!';
                break;
            case 'NEWUSER':
                discountAmount = 15;
                message = 'Coupon applied: $15 off!';
                break;
            default:
                message = 'Invalid coupon code';
                discountAmount = 0;
        }

        if (discountAmount > 0) {
            setDiscount(discountAmount);
            setCouponMessage(message);
            setCouponApplied(true);
        } else {
            setCouponMessage(message);
            setDiscount(0);
            setCouponApplied(false);
        }
    };

    const removeCoupon = () => {
        setCouponCode('');
        setDiscount(0);
        setCouponMessage('');
        setCouponApplied(false);
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        setQuantities((prev) => ({ ...prev, [itemId]: newQuantity }));
        if (updateCartItemQuantity) {
            updateCartItemQuantity(itemId, newQuantity);
        }
    };

    const handleRemoveItem = (itemId) => {
        if (removeCartItem) {
            removeCartItem(itemId);
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleBack = () => {
        navigate(-1);
    };

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const total = calculateTotal();
    const hasItems = listProductCart && listProductCart.length > 0;

    return (
        <div className={styles.viewCartContainer}>
            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
                <button className={styles.backBtn} onClick={handleBack}>
                    <AiOutlineArrowLeft />
                    <span>Back</span>
                </button>
                <div className={styles.progressSteps}>
                    <div className={`${styles.progressStep} ${styles.active}`}>
                        <AiOutlineShoppingCart />
                        <span>Cart</span>
                    </div>
                    <div className={styles.progressLine}></div>
                    <div className={styles.progressStep}>
                        <AiOutlineUser />
                        <span>Checkout</span>
                    </div>
                    <div className={styles.progressLine}></div>
                    <div className={styles.progressStep}>
                        <AiOutlineFileDone />
                        <span>Confirmation</span>
                    </div>
                </div>
            </div>

            {hasItems ? (
                <div className={styles.cartContent}>
                    <div className={styles.productsSection}>
                        <div className={styles.productsHeader}>
                            <span>Product</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total</span>
                        </div>

                        <div className={styles.productsList}>
                            {listProductCart.map((item, index) => (
                                <div key={index} className={styles.productItem}>
                                    <div className={styles.productInfo}>
                                        <img
                                            src={
                                                item.images?.[0] ||
                                                '/placeholder-image.jpg'
                                            }
                                            alt={item.name}
                                            className={styles.productImage}
                                        />
                                        <div className={styles.productDetails}>
                                            <h3>{item.name}</h3>
                                            <p>SKU: {item.sku}</p>
                                            {item.size && (
                                                <p>Size: {item.size}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.productPrice}>
                                        ${item.price?.toFixed(2) || '0.00'}
                                    </div>

                                    <div className={styles.quantityControls}>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                handleQuantityChange(
                                                    index,
                                                    (quantities[index] ||
                                                        item.quantity ||
                                                        1) - 1
                                                )
                                            }
                                        >
                                            <AiOutlineMinus />
                                        </button>
                                        <span className={styles.quantity}>
                                            {quantities[index] ||
                                                item.quantity ||
                                                1}
                                        </span>
                                        <button
                                            className={styles.quantityBtn}
                                            onClick={() =>
                                                handleQuantityChange(
                                                    index,
                                                    (quantities[index] ||
                                                        item.quantity ||
                                                        1) + 1
                                                )
                                            }
                                        >
                                            <AiOutlinePlus />
                                        </button>
                                    </div>

                                    <div className={styles.productTotal}>
                                        $
                                        {(
                                            (item.price || 0) *
                                            (quantities[index] ||
                                                item.quantity ||
                                                1)
                                        ).toFixed(2)}
                                    </div>

                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => handleRemoveItem(index)}
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.orderSummary}>
                        <h2>Order Summary</h2>

                        <div className={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>
                                {shipping === 0
                                    ? 'FREE'
                                    : `$${shipping.toFixed(2)}`}
                            </span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Tax</span>
                            <span>${(subtotal * 0.08).toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                            <div className={styles.summaryRow}>
                                <span>Discount</span>
                                <span className={styles.discount}>
                                    -${discount.toFixed(2)}
                                </span>
                            </div>
                        )}

                        <div
                            className={`${styles.summaryRow} ${styles.totalRow}`}
                        >
                            <span>Total</span>
                            <span>${calculateTotal().toFixed(2)}</span>
                        </div>

                        <div className={styles.couponSection}>
                            <div className={styles.couponInputWrapper}>
                                <input
                                    type='text'
                                    placeholder='Enter coupon code'
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value.trim())
                                    }
                                    className={styles.couponInput}
                                    disabled={couponApplied}
                                />
                                {!couponApplied ? (
                                    <button
                                        onClick={applyCoupon}
                                        className={styles.applyCouponBtn}
                                        disabled={!couponCode.trim()}
                                    >
                                        Apply
                                    </button>
                                ) : (
                                    <button
                                        onClick={removeCoupon}
                                        className={styles.removeCouponBtn}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                            {couponMessage && (
                                <div
                                    className={`${styles.couponMessage} ${couponApplied ? styles.success : styles.error}`}
                                >
                                    {couponMessage}
                                </div>
                            )}
                            <div className={styles.availableCoupons}>
                                <p>Available coupons:</p>
                                <span>SAVE10 (10% off)</span>
                                <span>SAVE20 (20% off)</span>
                                <span>FREESHIP (Free shipping)</span>
                                <span>NEWUSER ($15 off)</span>
                            </div>
                        </div>

                        <div className={styles.shippingNote}>
                            {subtotal < 100 && (
                                <p>
                                    Add ${(100 - subtotal).toFixed(2)} more for
                                    free shipping!
                                </p>
                            )}
                        </div>

                        <div className={styles.actionButtons}>
                            <Button
                                content='Continue Shopping'
                                onClick={() => navigate('/shop')}
                                className={styles.continueBtn}
                            />
                            <Button
                                content='Proceed to Checkout'
                                onClick={handleCheckout}
                                className={styles.checkoutBtn}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.emptyCart}>
                    <AiOutlineShoppingCart className={styles.emptyIcon} />
                    <h2>Your cart is empty</h2>
                    <p>
                        Looks like you haven't added anything to your cart yet.
                    </p>
                    <Button
                        content='Start Shopping'
                        onClick={() => navigate('/shop')}
                        className={styles.shopBtn}
                    />
                </div>
            )}
        </div>
    );
}

export default ViewCart;
