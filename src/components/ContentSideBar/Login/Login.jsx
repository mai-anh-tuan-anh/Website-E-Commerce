import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
function Login() {
    const { container, title, rememberMe } = styles;
    return (
        <div className={container}>
            <div className={title}>SIGN IN</div>
            <InputCommon label='Username' type='text' isRequired />
            <InputCommon label='Password' type='password' isRequired />
            <div className={rememberMe}>
                <input type='checkbox' />
                <span>Remember me</span>
            </div>
            <Button content='Sign In' />
        </div>
    );
}

export default Login;
