import styles from './styles.module.scss';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';
import { register, signIn } from '@/apis/authService';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/storeProvider';
import { COOKIE_EXPIRATION, TOAST_MESSAGES } from '@/constants/appConstants';

import AuthForm from './components/AuthForm';
import SocialLoginButtons from './components/SocialLoginButtons';
import RememberMeCheckbox from './components/RememberMeCheckbox';

function Login() {
    const { container, title, footerLinks, forgotPasswordLink } = styles;
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { toast } = useContext(ToastContext);
    const { isOpen, setIsOpen, handleGetListProductsCart } =
        useContext(SideBarContext);
    const { setUserId } = useContext(StoreContext);

    const formik = useFormik({
        initialValues: { email: '', password: '', cfmpassword: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Passwords must match'
            )
        }),
        onSubmit: async (values) => {
            if (isLoading) return;

            const { email: username, password } = values;
            if (isRegister) {
                setIsLoading(true);
                await register({ username, password })
                    .then((res) => {
                        toast.success(res.data.message);
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            } else {
                setIsLoading(true);
                await signIn({ username, password })
                    .then((res) => {
                        const { id, token, refreshToken } = res.data;
                        setUserId(id);

                        const cookieOptions = rememberMe
                            ? { expires: COOKIE_EXPIRATION.REMEMBER_ME }
                            : { expires: COOKIE_EXPIRATION.SESSION };

                        Cookies.set('token', token, cookieOptions);
                        Cookies.set('userId', id, cookieOptions);
                        Cookies.set(
                            'refreshToken',
                            refreshToken,
                            cookieOptions
                        );
                        setIsOpen(false);
                        toast.success(TOAST_MESSAGES.LOGIN_SUCCESS);
                        handleGetListProductsCart(id, 'cart');
                    })
                    .catch((err) => {
                        toast.error(
                            err.response?.data?.message || 'Login failed'
                        );
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }
    });

    const handleSocialLogin = async (provider) => {
        try {
            setIsLoading(true);

            switch (provider) {
                case 'google':
                    toast.info(TOAST_MESSAGES.GOOGLE_LOGIN_COMING_SOON);
                    break;
                case 'facebook':
                    toast.info(TOAST_MESSAGES.FACEBOOK_LOGIN_COMING_SOON);
                    break;
                case 'twitter':
                    toast.info(TOAST_MESSAGES.TWITTER_LOGIN_COMING_SOON);
                    break;
                default:
                    toast.error(TOAST_MESSAGES.INVALID_PROVIDER);
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Social login error:', error);
            toast.error(TOAST_MESSAGES.SOCIAL_LOGIN_FAILED);
            setIsLoading(false);
        }
    };

    const handleToggleForm = () => {
        setIsRegister(!isRegister);
        formik.resetForm();
    };

    return (
        <div className={container}>
            {isLoading && <LoadingSpinner />}
            <div className={title}>{isRegister ? 'SIGN UP' : 'SIGN IN'}</div>

            <AuthForm
                formik={formik}
                isRegister={isRegister}
                onToggle={handleToggleForm}
            />

            {!isRegister && (
                <RememberMeCheckbox
                    checked={rememberMe}
                    onChange={setRememberMe}
                />
            )}

            <SocialLoginButtons onSocialLogin={handleSocialLogin} />

            <div className={footerLinks}>
                <span className={forgotPasswordLink}>
                    Forgot your password?
                </span>
            </div>
        </div>
    );
}

export default Login;
