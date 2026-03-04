import BoxIcon from './BoxIcon/BoxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import ReloadIcon from '@icons/svgs/reloadicon.svg';
import HeartIcon from '@icons/svgs/hearticon.svg';
import CartIcon from '@icons/svgs/carticon.svg';
import { useState, useEffect, useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
function MyHeader() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container,
        hidden
    } = styles;

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const { isOpen, setIsOpen } = useContext(SideBarContext);
    console.log(isOpen);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling down and past 200px
                setIsVisible(false);
            } else {
                // Scrolling up
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);
    return (
        <div className={`${container} ${!isVisible ? hidden : ''}`}>
            <div className={containerHeader}>
                <div className={containerBox}>
                    <div className={containerBoxIcon}>
                        {dataBoxIcon.map((item) => {
                            return (
                                <BoxIcon
                                    key={item.type}
                                    type={item.type}
                                    href={item.href}
                                />
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
                                <Menu
                                    content={item.content}
                                    href={item.href}
                                    setIsOpen={setIsOpen}
                                />
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
