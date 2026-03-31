import styles from '../styles.module.scss';
import { useContext, useState } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { StoreContext } from '@contexts/storeProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
function Menu({ content, href, className, onSelect }) {
    const { menu, subMenu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, setUserInfo } = useContext(StoreContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        if (content === 'Sign In' && !userInfo) {
            setType('login');
            setIsOpen(true);
            onSelect?.();
        } else if (content === 'Sign In' && userInfo) {
            setIsShowSubMenu(!isShowSubMenu);
            return; // keep dropdown open to allow logout submenu
        }
        if (content === 'Our shop') {
            navigate('/shop');
            onSelect?.();
        }
        if (content === 'Contact us') {
            navigate('/contact');
            onSelect?.();
        }

        // For remaining items (Elements, Search, etc.), close dropdown.
        if (content !== 'Sign In') {
            onSelect?.();
        }
    };
    const handleRenderText = (content) => {
        if (content === 'Sign In' && userInfo) {
            return userInfo.username;
        }
        return content;
    };
    const handleLogOut = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setUserInfo(null);
        setIsShowSubMenu(false);
        window.location.reload();
        onSelect?.();
    };
    return (
        <a
            className={`${menu}${className ? ` ${className}` : ''}`}
            href={href}
            onClick={handleClick}
        >
            {handleRenderText(content)}
            {isShowSubMenu && (
                <div
                    onClick={handleLogOut}
                    className={subMenu}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <FiLogOut style={{ marginRight: '6px' }} />
                    LOG OUT
                </div>
            )}
        </a>
    );
}

export default Menu;
