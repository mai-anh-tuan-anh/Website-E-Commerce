import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import { useFormik } from 'formik';
import * as Yup from 'yup';
function Login() {
    const {
        container,
        title,
        formGroup,
        signInButton,
        divider,
        socialLogin,
        socialButtons,
        socialButton,
        facebookButton,
        twitterButton,
        googleButton,
        footerLinks,
        signupLink,
        forgotPasswordLink
    } = styles;
    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required')
        }),
        onSubmit: (values) => {
            console.log(values);
        }
    });
    return (
        <div className={container}>
            <div className={title}>LOG IN</div>
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
                </div>

                <div className={signInButton}>
                    <Button content='Sign In' type='submit' />
                </div>
            </form>
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
                <span className={signupLink}>Signup</span>
                <span className={forgotPasswordLink}>
                    Forgot your password?
                </span>
            </div>
        </div>
    );
}

export default Login;
