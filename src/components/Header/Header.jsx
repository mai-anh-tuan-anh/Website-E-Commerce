import BoxIcon from './BoxIcon/BoxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import ReloadIcon from '@icons/svgs/reloadicon.svg';
import HeartIcon from '@icons/svgs/hearticon.svg';
import CartIcon from '@icons/svgs/carticon.svg';
function MyHeader() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container
    } = styles;
    return (
        <div className={container}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map((item) => {
                            return (
                                <BoxIcon type={item.type} href={item.href} />
                            );
                        })}
                    </div>
                    <div className={containerMenu}>
                        {dataMenu.slice(0, 3).map((item) => {
                            return (
                                <Menu content={item.content} href={item.href} />
                            );
                        })}
                    </div>
                </div>
                <div className={styles.logoWrapper}>
                    <img src={Logo} alt='Logo' className={styles.logo} />
                </div>
                <div className={containerBox}>
                    <div className={containerMenu}>
                        {dataMenu.slice(3, dataMenu.length).map((item) => {
                            return (
                                <Menu content={item.content} href={item.href} />
                            );
                        })}
                    </div>
                    <div className={containerBoxIcon}>
                        <img
                            width={26}
                            height={26}
                            src={ReloadIcon}
                            alt='ReloadIcon'
                        />
                        <img
                            width={26}
                            height={26}
                            src={HeartIcon}
                            alt='HeartIcon'
                        />
                        <img
                            width={26}
                            height={26}
                            src={CartIcon}
                            alt='CartIcon'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
