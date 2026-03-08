import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';

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

    return (
        <div className={container}>
            <div className={title}>LOG IN</div>

            <div className={formGroup}>
                <InputCommon label='Email' type='email' isRequired />
                <InputCommon label='Password' type='password' isRequired />
            </div>

            <div className={signInButton}>
                <Button content='Sign In' />
            </div>

            <div className={divider}>or</div>

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
