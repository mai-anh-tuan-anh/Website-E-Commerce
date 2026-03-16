import { useNavigate } from 'react-router-dom';
import {
    AiOutlineCheckCircle,
    AiOutlineShoppingCart,
    AiOutlineHome,
    AiOutlineFileDone,
    AiOutlineArrowLeft
} from 'react-icons/ai';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const handleBack = () => {
        navigate('/shop');
    };

    return (
        <div className={styles.confirmationContainer}>
            <button className={styles.backBtn} onClick={handleBack}>
                <AiOutlineArrowLeft />
                <span>Back to Shop</span>
            </button>
            <div className={styles.confirmationCard}>
                <div className={styles.successIcon}>
                    <AiOutlineCheckCircle />
                </div>

                <h1>Order Confirmed!</h1>
                <p className={styles.thankYou}>Thank you for your purchase</p>

                <div className={styles.orderInfo}>
                    <div className={styles.orderNumber}>
                        <span className={styles.label}>Order Number:</span>
                        <span className={styles.value}>{orderNumber}</span>
                    </div>
                    <div className={styles.orderDate}>
                        <span className={styles.label}>Order Date:</span>
                        <span className={styles.value}>
                            {new Date().toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className={styles.nextSteps}>
                    <h2>What's Next?</h2>
                    <div className={styles.steps}>
                        <div className={styles.step}>
                            <AiOutlineFileDone className={styles.stepIcon} />
                            <div className={styles.stepContent}>
                                <h3>Order Processing</h3>
                                <p>We're preparing your order for shipment</p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <AiOutlineShoppingCart
                                className={styles.stepIcon}
                            />
                            <div className={styles.stepContent}>
                                <h3>Shipping Confirmation</h3>
                                <p>
                                    You'll receive an email with tracking
                                    details
                                </p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <AiOutlineHome className={styles.stepIcon} />
                            <div className={styles.stepContent}>
                                <h3>Delivery</h3>
                                <p>Your package will arrive at your doorstep</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.emailNotice}>
                    <p>
                        A confirmation email has been sent to your registered
                        email address with all order details.
                    </p>
                </div>

                <div className={styles.actionButtons}>
                    <Button
                        content='Continue Shopping'
                        onClick={() => navigate('/shop')}
                        className={styles.shopBtn}
                    />
                    <Button
                        content='View Order History'
                        onClick={() => navigate('/account/orders')}
                        className={styles.historyBtn}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;
