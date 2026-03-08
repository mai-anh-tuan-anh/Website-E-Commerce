import styles from './styles.module.scss';
import { LuEyeClosed } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
function InputCommon({ label, type, isRequired = false, ...props }) {
    const { labelInput, boxInput, container, boxIcon, errMes } = styles;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password' ? true : false;
    const isShowTextPassword =
        type === 'password' && showPassword ? 'text' : type;
    const { formik, ...rest } = props;
    const Err = formik.touched[rest.id] && formik.errors[rest.id];
    return (
        <div className={container}>
            <div className={labelInput}>
                {label} {isRequired && <span>*</span>}
            </div>
            <div className={boxInput}>
                <input
                    type={isShowTextPassword}
                    {...rest}
                    onBlur={formik?.handleBlur}
                    onChange={formik?.handleChange}
                    value={formik?.values?.[rest.id]}
                />
                {isPassword && (
                    <div
                        className={boxIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                    </div>
                )}
                <div className={errMes}>{Err}</div>
            </div>
        </div>
    );
}

export default InputCommon;
