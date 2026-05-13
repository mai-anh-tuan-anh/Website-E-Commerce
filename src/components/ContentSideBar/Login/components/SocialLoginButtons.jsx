import { FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import styles from '../styles.module.scss';

function SocialLoginButtons({ onSocialLogin }) {
    const {
        socialLogin,
        socialButtons,
        socialButton,
        facebookButton,
        twitterButton,
        googleButton
    } = styles;

    return (
        <div className={socialLogin}>
            <div className={socialButtons}>
                <button
                    className={`${socialButton} ${facebookButton}`}
                    onClick={() => onSocialLogin('facebook')}
                    aria-label='Login with Facebook'
                >
                    <FaFacebookF />
                </button>
                <button
                    className={`${socialButton} ${twitterButton}`}
                    onClick={() => onSocialLogin('twitter')}
                    aria-label='Login with Twitter'
                >
                    <FaTwitter />
                </button>
                <button
                    className={`${socialButton} ${googleButton}`}
                    onClick={() => onSocialLogin('google')}
                    aria-label='Login with Google'
                >
                    <FaGoogle />
                </button>
            </div>
        </div>
    );
}

export default SocialLoginButtons;
