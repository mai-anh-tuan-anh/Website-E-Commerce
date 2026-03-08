import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
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
    const formik = useFormik({
        initialValues: { email: '', password: '', cfmpassword: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            cfmpassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    return (
        <div className={container}>
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
                        <input type='checkbox' id='rememberMe' />
                        <label htmlFor='rememberMe'>Remember me</label>
                    </div>
                )}
                <div className={signInButton}>
                    <Button
                        content={isRegister ? 'REGISTER' : 'LOGIN'}
                        type='submit'
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
                    <button className={`${socialButton} ${facebookButton}`}>
                        <FaFacebookF />
                    </button>
                    <button className={`${socialButton} ${twitterButton}`}>
                        <FaTwitter />
                    </button>
                    <button className={`${socialButton} ${googleButton}`}>
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
