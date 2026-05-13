import InputCommon from '@components/InputCommon/InputCommon';
import Button from '@components/Button/Button';
import styles from '../styles.module.scss';

function AuthForm({ formik, isRegister, onToggle }) {
    const { formGroup, signInButton, toggleButton, divider, footerLinks, signupLink, forgotPasswordLink } = styles;

    return (
        <>
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
                    onClick={onToggle}
                />
            </div>

            <div className={divider}>OR</div>
        </>
    );
}

export default AuthForm;
