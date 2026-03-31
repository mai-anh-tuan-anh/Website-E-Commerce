import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

    const validationSchema = z.object({
        fullName: z
            .string()
            .min(2, 'Name must be at least 2 characters')
            .refine((val) => val.trim().length > 0, 'Full name is required'),
        email: z
            .string()
            .email('Invalid email address')
            .refine((val) => val.trim().length > 0, 'Email is required'),
        phone: z
            .string()
            .min(1, 'Phone number is required')
            .regex(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number'),
        address: z
            .string()
            .min(5, 'Address must be at least 5 characters')
            .refine((val) => val.trim().length > 0, 'Address is required'),
        city: z
            .string()
            .min(2, 'City must be at least 2 characters')
            .refine((val) => val.trim().length > 0, 'City is required'),
        postalCode: z
            .string()
            .min(1, 'Postal code is required')
            .regex(/^[A-Za-z0-9\s\-]+$/, 'Invalid postal code'),
        country: z
            .string()
            .refine((val) => val.trim().length > 0, 'Country is required'),
        cardNumber:
            selectedPayment === 'card'
                ? z
                      .string()
                      .min(1, 'Card number is required')
                      .regex(/^[0-9\s]{16,19}$/, 'Invalid card number')
                : z.string().optional(),
        cardName:
            selectedPayment === 'card'
                ? z
                      .string()
                      .min(2, 'Name must be at least 2 characters')
                      .refine(
                          (val) => val.trim().length > 0,
                          'Name on card is required'
                      )
                : z.string().optional(),
        expiryDate:
            selectedPayment === 'card'
                ? z
                      .string()
                      .min(1, 'Expiry date is required')
                      .regex(
                          /^(0[1-9]|1[0-2])\/\d{2}$/,
                          'Invalid expiry date (MM/YY)'
                      )
                : z.string().optional(),
        cvv:
            selectedPayment === 'card'
                ? z
                      .string()
                      .min(1, 'CVV is required')
                      .regex(/^\d{3,4}$/, 'Invalid CVV')
                : z.string().optional()
    });

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        setValue,
        getValues
    } = useForm({
        defaultValues: {
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
        resolver: zodResolver(validationSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        setIsProcessing(true);

        // Simulate order processing
        setTimeout(() => {
            setIsProcessing(false);
            navigate('/order-confirmation');
        }, 2000);
    };

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
        <div className={`${styles.checkoutContainer} px-4 sm:px-6 lg:px-8`}>
            {/* Progress Indicator */}
            <div className={styles.progressIndicator}>
                <button className={styles.backBtn} onClick={handleBack}>
                    <AiOutlineArrowLeft />
                    <span>Back</span>
                </button>
                <div className={`${styles.progressSteps} overflow-x-auto`}>
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
                onSubmit={handleSubmit(onSubmit)}
                className={`${styles.checkoutForm} gap-6 lg:gap-8`}
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
                                    {...register('fullName')}
                                    className={
                                        errors.fullName ? styles.error : ''
                                    }
                                />
                                {errors.fullName && (
                                    <span className={styles.errorMessage}>
                                        {errors.fullName.message}
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
                                    {...register('email')}
                                    className={errors.email ? styles.error : ''}
                                />
                                {errors.email && (
                                    <span className={styles.errorMessage}>
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor='phone'>Phone Number *</label>
                                <input
                                    type='tel'
                                    id='phone'
                                    {...register('phone')}
                                    className={errors.phone ? styles.error : ''}
                                />
                                {errors.phone && (
                                    <span className={styles.errorMessage}>
                                        {errors.phone.message}
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
                                    {...register('address')}
                                    className={
                                        errors.address ? styles.error : ''
                                    }
                                />
                                {errors.address && (
                                    <span className={styles.errorMessage}>
                                        {errors.address.message}
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
                                    {...register('city')}
                                    className={errors.city ? styles.error : ''}
                                />
                                {errors.city && (
                                    <span className={styles.errorMessage}>
                                        {errors.city.message}
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
                                    {...register('postalCode')}
                                    className={
                                        errors.postalCode ? styles.error : ''
                                    }
                                />
                                {errors.postalCode && (
                                    <span className={styles.errorMessage}>
                                        {errors.postalCode.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='country'>Country *</label>
                                <Controller
                                    name='country'
                                    control={control}
                                    render={({ field }) => (
                                        <select
                                            id='country'
                                            {...field}
                                            className={
                                                errors.country
                                                    ? styles.error
                                                    : ''
                                            }
                                        >
                                            <option value='United States'>
                                                United States
                                            </option>
                                            <option value='Canada'>
                                                Canada
                                            </option>
                                            <option value='United Kingdom'>
                                                United Kingdom
                                            </option>
                                            <option value='Australia'>
                                                Australia
                                            </option>
                                            <option value='Germany'>
                                                Germany
                                            </option>
                                            <option value='France'>
                                                France
                                            </option>
                                            <option value='Japan'>Japan</option>
                                        </select>
                                    )}
                                />
                                {errors.country && (
                                    <span className={styles.errorMessage}>
                                        {errors.country.message}
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
                                            FREE
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
                                            {...register('cardNumber')}
                                            placeholder='1234 5678 9012 3456'
                                            className={
                                                errors.cardNumber
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {errors.cardNumber && (
                                            <span
                                                className={styles.errorMessage}
                                            >
                                                {errors.cardNumber.message}
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
                                            {...register('cardName')}
                                            className={
                                                errors.cardName
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {errors.cardName && (
                                            <span
                                                className={styles.errorMessage}
                                            >
                                                {errors.cardName.message}
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
                                            {...register('expiryDate')}
                                            placeholder='MM/YY'
                                            className={
                                                errors.expiryDate
                                                    ? styles.error
                                                    : ''
                                            }
                                        />
                                        {errors.expiryDate && (
                                            <span
                                                className={styles.errorMessage}
                                            >
                                                {errors.expiryDate.message}
                                            </span>
                                        )}
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor='cvv'>CVV *</label>
                                        <input
                                            type='text'
                                            id='cvv'
                                            {...register('cvv')}
                                            placeholder='123'
                                            className={
                                                errors.cvv ? styles.error : ''
                                            }
                                        />
                                        {errors.cvv && (
                                            <span
                                                className={styles.errorMessage}
                                            >
                                                {errors.cvv.message}
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
                        content={
                            isProcessing || isSubmitting
                                ? 'Processing...'
                                : 'Place Order'
                        }
                        disabled={isProcessing || isSubmitting}
                        className={styles.placeOrderBtn}
                    />
                </div>
            </form>
        </div>
    );
};

export default Checkout;
