import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';
import { register, signIn, getInfo } from '@/apis/authService';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { StoreContext } from '@/contexts/storeProvider';
function Login() {
    const {
        container,
        title,
        formGroup,
        signInButton,
        toggleButton,
        divider,
        socialLogin,
        socialButtons,
        socialButton,
        facebookButton,
        twitterButton,
        googleButton,
        footerLinks,
        signupLink,
        forgotPasswordLink,
        boxRememberMe
    } = styles;
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
            if (isLoading) {
                return;
            }

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

                        // Set cookies with different expiration based on remember me
                        const cookieOptions = rememberMe
                            ? { expires: 30 } // 30 days
                            : { expires: 1 }; // 1 day

                        Cookies.set('token', token, cookieOptions);
                        Cookies.set('userId', id, cookieOptions);
                        Cookies.set(
                            'refreshToken',
                            refreshToken,
                            cookieOptions
                        );
                        setIsOpen(false);
                        toast.success('Login successful!');
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

    // Handle third-party social login
    const handleSocialLogin = async (provider) => {
        try {
            setIsLoading(true);

            // For demo purposes - you'll need to implement actual OAuth flow
            switch (provider) {
                case 'google':
                    // Google OAuth implementation
                    toast.info('Google login coming soon!');
                    break;
                case 'facebook':
                    // Facebook OAuth implementation
                    toast.info('Facebook login coming soon!');
                    break;
                case 'twitter':
                    // Twitter OAuth implementation
                    toast.info('Twitter login coming soon!');
                    break;
                default:
                    toast.error('Invalid provider');
            }

            setIsLoading(false);
        } catch (error) {
            console.error('Social login error:', error);
            toast.error('Social login failed');
            setIsLoading(false);
        }
    };

    return (
        <div className={container}>
            {isLoading && <LoadingSpinner />}
            <div className={title}>{isRegister ? 'SIGN UP' : 'SIGN IN'}</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={formGroup}>
                    <InputCommon
                        id='email'
                        label='Email'
                        type='email'
                        isRequired
                        formik={formik}
                    />

                    <InputCommon
                        id='password'
                        label='Password'
                        type='password'
                        isRequired
                        formik={formik}
                    />
                    {isRegister && (
                        <InputCommon
                            id='cfmpassword'
                            label='Confirm Password'
                            type='password'
                            isRequired
                            formik={formik}
                        />
                    )}
                </div>
                {!isRegister && (
                    <div className={boxRememberMe}>
                        <input
                            type='checkbox'
                            id='rememberMe'
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor='rememberMe'>Remember me</label>
                    </div>
                )}
                <div className={signInButton}>
                    <Button
                        content={isRegister ? 'REGISTER' : 'LOGIN'}
                        type='submit'
                        // onClick={() => {
                        //     toast.success('Login successful!');
                        // }}
                    />
                </div>
            </form>
            <div className={toggleButton}>
                <Button
                    content={
                        isRegister
                            ? 'Already have an account?'
                            : "Don't have an account?"
                    }
                    onClick={() => {
                        setIsRegister(!isRegister);
                        formik.resetForm();
                    }}
                />
            </div>

            <div className={divider}>OR</div>

            <div className={socialLogin}>
                <div className={socialButtons}>
                    <button
                        className={`${socialButton} ${facebookButton}`}
                        onClick={() => handleSocialLogin('facebook')}
                    >
                        <FaFacebookF />
                    </button>
                    <button
                        className={`${socialButton} ${twitterButton}`}
                        onClick={() => handleSocialLogin('twitter')}
                    >
                        <FaTwitter />
                    </button>
                    <button
                        className={`${socialButton} ${googleButton}`}
                        onClick={() => handleSocialLogin('google')}
                    >
                        <FaGoogle />
                    </button>
                </div>
            </div>

            <div className={footerLinks}>
                <span className={forgotPasswordLink}>
                    Forgot your password?
                </span>
            </div>
        </div>
    );
}

export default Login;
