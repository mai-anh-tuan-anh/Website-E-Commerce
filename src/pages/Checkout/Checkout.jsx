import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineHome,
    AiOutlineCheckCircle,
    AiOutlineCreditCard,
    AiOutlinePayCircle,
    AiOutlineFieldTime,
    AiOutlineShoppingCart,
    AiOutlineFileDone,
    AiOutlineArrowLeft
} from 'react-icons/ai';
import { SideBarContext } from '@contexts/SideBarProvider';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';

const Checkout = () => {
    const navigate = useNavigate();
    const { listProductCart } = useContext(SideBarContext);
    const [selectedPayment, setSelectedPayment] = useState('card');
    const [selectedShipping, setSelectedShipping] = useState('standard');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleBack = () => {
        navigate(-1);
    };

    const calculateSubtotal = () => {
        if (!listProductCart || listProductCart.length === 0) return 0;
        return listProductCart.reduce((total, item) => {
            const itemTotal = (item.price || 0) * (item.quantity || 1);
            return total + itemTotal;
        }, 0);
    };

    const calculateShipping = () => {
        if (selectedShipping === 'express') return 25;
        const subtotal = calculateSubtotal();
        return subtotal > 100 ? 0 : 10;
    };

    const calculateTax = () => calculateSubtotal() * 0.08;
    const calculateTotal = () =>
        calculateSubtotal() + calculateShipping() + calculateTax();

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .required('Full name is required')
            .min(2, 'Name must be at least 2 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number'),
        address: Yup.string()
            .required('Address is required')
            .min(5, 'Address must be at least 5 characters'),
        city: Yup.string()
            .required('City is required')
            .min(2, 'City must be at least 2 characters'),
        postalCode: Yup.string()
            .required('Postal code is required')
            .matches(/^[A-Za-z0-9\s\-]+$/, 'Invalid postal code'),
        country: Yup.string().required('Country is required'),
        cardNumber:
            selectedPayment === 'card'
                ? Yup.string()
                      .required('Card number is required')
                      .matches(/^[0-9\s]{16,19}$/, 'Invalid card number')
                : Yup.string(),
        cardName:
            selectedPayment === 'card'
                ? Yup.string()
                      .required('Name on card is required')
                      .min(2, 'Name must be at least 2 characters')
                : Yup.string(),
        expiryDate:
            selectedPayment === 'card'
                ? Yup.string()
                      .required('Expiry date is required')
                      .matches(
                          /^(0[1-9]|1[0-2])\/\d{2}$/,
                          'Invalid expiry date (MM/YY)'
                      )
                : Yup.string(),
        cvv:
            selectedPayment === 'card'
                ? Yup.string()
                      .required('CVV is required')
                      .matches(/^\d{3,4}$/, 'Invalid CVV')
                : Yup.string()
    });

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            postalCode: '',
            country: 'United States',
            cardNumber: '',
            cardName: '',
            expiryDate: '',
            cvv: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsProcessing(true);

            // Simulate order processing
            setTimeout(() => {
                setIsProcessing(false);
                navigate('/order-confirmation');
            }, 2000);
        }
    });

    const subtotal = calculateSubtotal();
    const shipping = calculateShipping();
    const tax = calculateTax();
    const total = calculateTotal();
    const hasItems = listProductCart && listProductCart.length > 0;

    if (!hasItems) {
        return (
            <div className={styles.emptyCheckout}>
                <AiOutlineShoppingCart className={styles.emptyIcon} />
                <h2>Your cart is empty</h2>
                <p>Add items to your cart to proceed with checkout.</p>
                <Button
                    content='Continue Shopping'
                    onClick={() => navigate('/shop')}
                />
            </div>
        );
    }

    return (
        <div className={styles.checkoutContainer}>
            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
                <button className={styles.backBtn} onClick={handleBack}>
                    <AiOutlineArrowLeft />
                    <span>Back</span>
                </button>
                <div className={styles.progressSteps}>
                    <div className={styles.progressStep}>
                        <AiOutlineShoppingCart />
                        <span>Cart</span>
                    </div>
                    <div className={styles.progressLine}></div>
                    <div className={`${styles.progressStep} ${styles.active}`}>
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

            <form
                onSubmit={formik.handleSubmit}
                className={styles.checkoutForm}
            >
                <div className={styles.formGrid}>
                    {/* Customer Information */}
                    <section className={styles.section}>
                        <h2>
                            <AiOutlineUser />
                            Customer Information
                        </h2>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='fullName'>Full Name *</label>
                                <input
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.fullName &&
                                        formik.touched.fullName
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.fullName &&
                                    formik.touched.fullName && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.fullName}
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='email'>Email Address *</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.email &&
                                        formik.touched.email
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.email &&
                                    formik.touched.email && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.email}
                                        </span>
                                    )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor='phone'>Phone Number *</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    name='phone'
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.phone &&
                                        formik.touched.phone
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.phone &&
                                    formik.touched.phone && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.phone}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </section>

                    {/* Shipping Address */}
                    <section className={styles.section}>
                        <h2>
                            <AiOutlineHome />
                            Shipping Address
                        </h2>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='address'>
                                    Street Address *
                                </label>
                                <input
                                    type='text'
                                    id='address'
                                    name='address'
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.address &&
                                        formik.touched.address
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.address &&
                                    formik.touched.address && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.address}
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='city'>City *</label>
                                <input
                                    type='text'
                                    id='city'
                                    name='city'
                                    value={formik.values.city}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.city &&
                                        formik.touched.city
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.city && formik.touched.city && (
                                    <span className={styles.errorMessage}>
                                        {formik.errors.city}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor='postalCode'>
                                    Postal Code *
                                </label>
                                <input
                                    type='text'
                                    id='postalCode'
                                    name='postalCode'
                                    value={formik.values.postalCode}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.postalCode &&
                                        formik.touched.postalCode
                                            ? styles.error
                                            : ''
                                    }
                                />
                                {formik.errors.postalCode &&
                                    formik.touched.postalCode && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.postalCode}
                                        </span>
                                    )}
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='country'>Country *</label>
                                <select
                                    id='country'
                                    name='country'
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={
                                        formik.errors.country &&
                                        formik.touched.country
                                            ? styles.error
                                            : ''
                                    }
                                >
                                    <option value='United States'>
                                        United States
                                    </option>
                                    <option value='Canada'>Canada</option>
                                    <option value='United Kingdom'>
                                        United Kingdom
                                    </option>
                                    <option value='Australia'>Australia</option>
                                    <option value='Germany'>Germany</option>
                                    <option value='France'>France</option>
                                    <option value='Japan'>Japan</option>
                                </select>
                                {formik.errors.country &&
                                    formik.touched.country && (
                                        <span className={styles.errorMessage}>
                                            {formik.errors.country}
                                        </span>
                                    )}
                            </div>
                        </div>
                    </section>

                    {/* Shipping Method */}
                    <section className={styles.section}>
                        <h2>
                            <AiOutlineFieldTime />
                            Shipping Method
                        </h2>
                        <div className={styles.shippingOptions}>
                            <label className={styles.shippingOption}>
                                <input
                                    type='radio'
                                    name='shipping'
                                    value='standard'
                                    checked={selectedShipping === 'standard'}
                                    onChange={(e) =>
                                        setSelectedShipping(e.target.value)
                                    }
                                />
                                <div className={styles.optionContent}>
                                    <div className={styles.optionHeader}>
                                        <span className={styles.optionTitle}>
                                            Standard Shipping
                                        </span>
                                        <span className={styles.optionPrice}>
                                            {calculateShipping() === 0
                                                ? 'FREE'
                                                : `$${calculateShipping()}`}
                                        </span>
                                    </div>
                                    <span className={styles.optionDescription}>
                                        5-7 business days
                                    </span>
                                </div>
                            </label>
                            <label className={styles.shippingOption}>
                                <input
                                    type='radio'
                                    name='shipping'
                                    value='express'
                                    checked={selectedShipping === 'express'}
                                    onChange={(e) =>
                                        setSelectedShipping(e.target.value)
                                    }
                                />
                                <div className={styles.optionContent}>
                                    <div className={styles.optionHeader}>
                                        <span className={styles.optionTitle}>
                                            Express Shipping
                                        </span>
                                        <span className={styles.optionPrice}>
                                            $25.00
                                        </span>
                                    </div>
                                    <span className={styles.optionDescription}>
                                        2-3 business days
                                    </span>
                                </div>
                            </label>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className={styles.section}>
                        <h2>
                            <AiOutlineCreditCard />
                            Payment Method
                        </h2>
                        <div className={styles.paymentOptions}>
                            <label className={styles.paymentOption}>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='card'
                                    checked={selectedPayment === 'card'}
                                    onChange={(e) =>
                                        setSelectedPayment(e.target.value)
                                    }
                                />
                                <div className={styles.optionContent}>
                                    <AiOutlineCreditCard
                                        className={styles.paymentIcon}
                                    />
                                    <span>Credit/Debit Card</span>
                                </div>
                            </label>
                            <label className={styles.paymentOption}>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='paypal'
                                    checked={selectedPayment === 'paypal'}
                                    onChange={(e) =>
                                        setSelectedPayment(e.target.value)
                                    }
                                />
                                <div className={styles.optionContent}>
                                    <AiOutlinePayCircle
                                        className={styles.paymentIcon}
                                    />
                                    <span>PayPal</span>
                                </div>
                            </label>
                            <label className={styles.paymentOption}>
                                <input
                                    type='radio'
                                    name='payment'
                                    value='cod'
                                    checked={selectedPayment === 'cod'}
                                    onChange={(e) =>
                                        setSelectedPayment(e.target.value)
                                    }
                                />
                                <div className={styles.optionContent}>
                                    <AiOutlineFieldTime
                                        className={styles.paymentIcon}
                                    />
                                    <span>Cash on Delivery</span>
                                </div>
                            </label>
                        </div>

                        {selectedPayment === 'card' && (
                            <div className={styles.cardDetails}>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='cardNumber'>
                                            Card Number *
                                        </label>
                                        <input
                                            type='text'
                                            id='cardNumber'
                                            name='cardNumber'
                                            placeholder='1234 5678 9012 3456'
                                            value={formik.values.cardNumber}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.errors.cardNumber &&
                                                formik.touched.cardNumber
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {formik.errors.cardNumber &&
                                            formik.touched.cardNumber && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    {formik.errors.cardNumber}
                                                </span>
                                            )}
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='cardName'>
                                            Name on Card *
                                        </label>
                                        <input
                                            type='text'
                                            id='cardName'
                                            name='cardName'
                                            value={formik.values.cardName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.errors.cardName &&
                                                formik.touched.cardName
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {formik.errors.cardName &&
                                            formik.touched.cardName && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    {formik.errors.cardName}
                                                </span>
                                            )}
                                    </div>
                                </div>
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='expiryDate'>
                                            Expiry Date *
                                        </label>
                                        <input
                                            type='text'
                                            id='expiryDate'
                                            name='expiryDate'
                                            placeholder='MM/YY'
                                            value={formik.values.expiryDate}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.errors.expiryDate &&
                                                formik.touched.expiryDate
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {formik.errors.expiryDate &&
                                            formik.touched.expiryDate && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    {formik.errors.expiryDate}
                                                </span>
                                            )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='cvv'>CVV *</label>
                                        <input
                                            type='text'
                                            id='cvv'
                                            name='cvv'
                                            placeholder='123'
                                            value={formik.values.cvv}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={
                                                formik.errors.cvv &&
                                                formik.touched.cvv
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {formik.errors.cvv &&
                                            formik.touched.cvv && (
                                                <span
                                                    className={
                                                        styles.errorMessage
                                                    }
                                                >
                                                    {formik.errors.cvv}
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </section>
                </div>

                {/* Order Summary */}
                <div className={styles.orderSummary}>
                    <h2>Order Summary</h2>

                    <div className={styles.productList}>
                        {listProductCart.map((item, index) => (
                            <div key={index} className={styles.summaryProduct}>
                                <div className={styles.productInfo}>
                                    <img
                                        src={
                                            item.images?.[0] ||
                                            '/placeholder-image.jpg'
                                        }
                                        alt={item.name}
                                        className={styles.productImage}
                                    />
                                    <div>
                                        <h4>{item.name}</h4>
                                        <p>
                                            Size: {item.size || 'N/A'} | Qty:{' '}
                                            {item.quantity || 1}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.productPrice}>
                                    $
                                    {(
                                        (item.price || 0) * (item.quantity || 1)
                                    ).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.summarySection}>
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
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div
                            className={`${styles.summaryRow} ${styles.totalRow}`}
                        >
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.summaryNote}>
                        <AiOutlineCheckCircle className={styles.noteIcon} />
                        <p>
                            Your order is eligible for free shipping when
                            subtotal exceeds $100
                        </p>
                    </div>

                    <Button
                        type='submit'
                        content={isProcessing ? 'Processing...' : 'Place Order'}
                        disabled={isProcessing}
                        className={styles.placeOrderBtn}
                    />
                </div>
            </form>
        </div>
    );
};

export default Checkout;
