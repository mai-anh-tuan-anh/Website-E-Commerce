import styles from './styles.module.scss';
import { LuEyeClosed } from 'react-icons/lu';
import { LuEye } from 'react-icons/lu';
import { useState } from 'react';
function InputCommon({ label, type, isRequired = false }) {
    const { labelInput, boxInput, container, boxIcon } = styles;
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password' ? true : false;
    const isShowTextPassword =
        type === 'password' && showPassword ? 'text' : type;
    return (
        <div className={container}>
            <div className={labelInput}>
                {label} {isRequired && <span>*</span>}
            </div>
            <div className={boxInput}>
                <input type={isShowTextPassword} />
                {isPassword && (
                    <div
                        className={boxIcon}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <LuEye /> : <LuEyeClosed />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputCommon;
