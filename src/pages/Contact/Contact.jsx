import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
    AiOutlineUser,
    AiOutlineMail,
    AiOutlinePhone,
    AiOutlineMessage,
    AiOutlineEnvironment,
    AiOutlineClockCircle,
    AiOutlineSend
} from 'react-icons/ai';
import MyHeader from '@components/Header/Header';
import MyFooter from '@components/Footer/Footer';
import Button from '@components/Button/Button';
import styles from './styles.module.scss';

const validationSchema = z.object({
    name: z
        .string()
        .min(2, 'Name must be at least 2 characters')
        .refine((val) => val.trim().length > 0, 'Name is required'),
    email: z
        .string()
        .email('Invalid email address')
        .refine((val) => val.trim().length > 0, 'Email is required'),
    phone: z
        .string()
        .min(1, 'Phone number is required')
        .regex(/^[+]?[\d\s\-\(\)]+$/, 'Invalid phone number'),
    subject: z
        .string()
        .min(3, 'Subject must be at least 3 characters')
        .refine((val) => val.trim().length > 0, 'Subject is required'),
    message: z
        .string()
        .min(10, 'Message must be at least 10 characters')
        .refine((val) => val.trim().length > 0, 'Message is required')
});

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        },
        resolver: zodResolver(validationSchema),
        mode: 'onBlur'
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus({
                type: 'success',
                message:
                    'Thank you for contacting us! We will get back to you soon.'
            });
            reset();
        }, 2000);
    };

    const contactInfo = [
        {
            icon: <AiOutlineEnvironment />,
            title: 'Address',
            details: [
                '123 Fashion Street',
                'New York, NY 10001',
                'United States'
            ]
        },
        {
            icon: <AiOutlinePhone />,
            title: 'Phone',
            details: ['+1 (555) 123-4567', '+1 (555) 987-6543']
        },
        {
            icon: <AiOutlineMail />,
            title: 'Email',
            details: ['support@fashionshop.com', 'info@fashionshop.com']
        },
        {
            icon: <AiOutlineClockCircle />,
            title: 'Working Hours',
            details: [
                'Monday - Friday: 9:00 AM - 6:00 PM',
                'Saturday: 10:00 AM - 4:00 PM',
                'Sunday: Closed'
            ]
        }
    ];

    return (
        <div className={`${styles.contactContainer} px-4 sm:px-6 lg:px-8`}>
            <MyHeader />

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
                    <h1>Contact Us</h1>
                    <p>
                        We'd love to hear from you. Send us a message and we'll
                        respond as soon as possible.
                    </p>
                </div>
            </section>

            <div className={`${styles.contentWrapper} mx-auto w-full max-w-7xl`}>
                {/* Contact Information */}
                <section className={styles.contactInfo}>
                    <h2>Get in Touch</h2>
                    <div className={styles.infoGrid}>
                        {contactInfo.map((info, index) => (
                            <div key={index} className={styles.infoCard}>
                                <div className={styles.infoIcon}>
                                    {info.icon}
                                </div>
                                <div className={styles.infoContent}>
                                    <h3>{info.title}</h3>
                                    {info.details.map((detail, idx) => (
                                        <p key={idx}>{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Form */}
                <section className={styles.contactFormSection}>
                    <h2>Send us a Message</h2>

                    {submitStatus && (
                        <div
                            className={`${styles.alert} ${styles[submitStatus.type]}`}
                        >
                            {submitStatus.message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={styles.contactForm}
                    >
                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='name'>
                                    <AiOutlineUser /> Full Name *
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    {...register('name')}
                                    className={errors.name ? styles.error : ''}
                                    placeholder='John Doe'
                                />
                                {errors.name && (
                                    <span className={styles.errorMessage}>
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor='email'>
                                    <AiOutlineMail /> Email Address *
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    {...register('email')}
                                    className={errors.email ? styles.error : ''}
                                    placeholder='john@example.com'
                                />
                                {errors.email && (
                                    <span className={styles.errorMessage}>
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor='phone'>
                                    <AiOutlinePhone /> Phone Number *
                                </label>
                                <input
                                    type='tel'
                                    id='phone'
                                    {...register('phone')}
                                    className={errors.phone ? styles.error : ''}
                                    placeholder='+1 (555) 123-4567'
                                />
                                {errors.phone && (
                                    <span className={styles.errorMessage}>
                                        {errors.phone.message}
                                    </span>
                                )}
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor='subject'>
                                    <AiOutlineMessage /> Subject *
                                </label>
                                <input
                                    type='text'
                                    id='subject'
                                    {...register('subject')}
                                    className={
                                        errors.subject ? styles.error : ''
                                    }
                                    placeholder='How can we help you?'
                                />
                                {errors.subject && (
                                    <span className={styles.errorMessage}>
                                        {errors.subject.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor='message'>
                                <AiOutlineMessage /> Message *
                            </label>
                            <textarea
                                id='message'
                                {...register('message')}
                                className={errors.message ? styles.error : ''}
                                placeholder='Tell us more about your inquiry...'
                                rows='6'
                            />
                            {errors.message && (
                                <span className={styles.errorMessage}>
                                    {errors.message.message}
                                </span>
                            )}
                        </div>

                        <Button
                            type='submit'
                            content={
                                isSubmitting ? (
                                    <>
                                        <span className={styles.spinner}></span>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <AiOutlineSend />
                                        Send Message
                                    </>
                                )
                            }
                            disabled={isSubmitting}
                            className={styles.submitBtn}
                        />
                    </form>
                </section>
            </div>

            {/* Map Section */}
            <section className={`${styles.mapSection} mx-auto w-full max-w-7xl`}>
                <h2>Find Us</h2>
                <div className={styles.mapContainer}>
                    <iframe
                        src='https://www.openstreetmap.org/export/embed.html?bbox=105.786,20.970,105.796,20.978&layer=mapnik&marker=20.974,105.791'
                        width='100%'
                        height='100%'
                        style={{ border: 0 }}
                        allowFullScreen
                        loading='lazy'
                        referrerPolicy='no-referrer-when-downgrade'
                        title='Fashion Shop Location'
                        className={styles.mapIframe}
                    />
                    <div
                        className={styles.mapOverlay}
                        onClick={() =>
                            window.open(
                                'https://www.google.com/maps/dir/?api=1&destination=AEON+Mall+Hà+Đông+Hà+Nội',
                                '_blank'
                            )
                        }
                    />
                </div>
            </section>

            <MyFooter />
        </div>
    );
};

export default Contact;
