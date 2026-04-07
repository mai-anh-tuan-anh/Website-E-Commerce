import BoxIcon from './BoxIcon/BoxIcon';
import Menu from './Menu/Menu';
import { dataBoxIcon, dataMenu } from './constants';
import styles from './styles.module.scss';
import Logo from '@icons/images/logo.png';
import { TfiReload } from 'react-icons/tfi';
import { TfiHeart } from 'react-icons/tfi';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect, useContext, useRef } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import Cookies from 'js-cookie';
import { FiMenu } from 'react-icons/fi';
function MyHeader() {
    const {
        containerBoxIcon,
        containerMenu,
        containerHeader,
        containerBox,
        container,
        hidden,
        boxCart,
        quantity
    } = styles;

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuWrapRef = useRef(null);

    const {
        isOpen,
        setIsOpen,
        type,
        setType,
        listProductCart,
        handleGetListProductsCart
    } = useContext(SideBarContext);
    const userId = Cookies.get('userId');

    const handleOpenSideBar = (type) => {
        setIsOpen(true);
        setType(type);

        // Load cart data when opening cart sidebar
        if (type === 'cart' && userId) {
            handleGetListProductsCart(userId, 'cart');
        }
    };

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

    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleDocMouseDown = (event) => {
            const target = event.target;
            if (
                mobileMenuWrapRef.current &&
                !mobileMenuWrapRef.current.contains(target)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleDocMouseDown);
        return () => {
            document.removeEventListener('mousedown', handleDocMouseDown);
        };
    }, [isMobileMenuOpen]);
    return (
        <div className={`${container} ${!isVisible ? hidden : ''}`}>
            <div className={`${containerHeader} px-2 sm:px-4`}>
                <div className={containerBox}>
                    <div
                        className={`${containerBoxIcon} ${styles.socialIcons} hidden xl:flex`}
                    >
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
                    <div
                        className={`${styles.mobileMenuWrap} xl:hidden`}
                        ref={mobileMenuWrapRef}
                    >
                        <button
                            type='button'
                            className={`${styles.mobileMenuButton} flex xl:hidden`}
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((v) => !v)}
                        >
                            <FiMenu className='xl:hidden' />
                        </button>

                        {isMobileMenuOpen && (
                            <div className={styles.mobileMenuPanel}>
                                <div className={styles.mobileMenuList}>
                                    {dataMenu.map((item, index) => (
                                        <Menu
                                            key={index}
                                            content={item.content}
                                            href={item.href}
                                            className={styles.mobileMenuItem}
                                            onSelect={() =>
                                                setIsMobileMenuOpen(false)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={`${containerMenu} ${styles.desktopMenu} `}>
                        {dataMenu.slice(0, 3).map((item, index) => {
                            return (
                                <Menu
                                    className={'hidden xl:inline-flex'}
                                    content={item.content}
                                    href={item.href}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                </div>
                <div
                    className={`${styles.logoWrapper} hidden md:inline w-25 sm:w-30 md:w-38.25`}
                >
                    <img src={Logo} alt='Logo' className={styles.logo} />
                </div>
                <div className={containerBox}>
                    <div
                        className={`${containerMenu} ${styles.desktopMenu} hidden xl:flex`}
                    >
                        {dataMenu.slice(3, dataMenu.length).map((item) => {
                            return (
                                <Menu
                                    className={'hidden xl:inline-flex'}
                                    content={item.content}
                                    href={item.href}
                                />
                            );
                        })}
                    </div>
                    <div
                        className={`${containerBoxIcon} !gap-2 sm:!gap-3 md:!gap-5`}
                    >
                        <span>
                            <TfiReload
                                className={styles.iconHover}
                                style={{ fontSize: '20px' }}
                                onClick={() => handleOpenSideBar('compare')}
                            />
                        </span>
                        <span>
                            <TfiHeart
                                className={styles.iconHover}
                                style={{ fontSize: '20px' }}
                                onClick={() => handleOpenSideBar('wishlist')}
                            />
                        </span>
                        <div className={boxCart}>
                            <AiOutlineShoppingCart
                                className={styles.iconHover}
                                style={{ fontSize: '25px' }}
                                onClick={() => handleOpenSideBar('cart')}
                            />
                            <div className={quantity}>
                                {listProductCart?.length || 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyHeader;
