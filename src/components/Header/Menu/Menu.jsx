import styles from '../styles.module.scss';
import { useContext, useState } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { StoreContext } from '@contexts/storeProvider';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
function Menu({ content, href }) {
    const { menu, subMenu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, setUserInfo } = useContext(StoreContext);
    const [isShowSubMenu, setIsShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        if (content === 'Sign In' && !userInfo) {
            setType('login');
            setIsOpen(true);
        } else if (content === 'Sign In' && userInfo) {
            setIsShowSubMenu(!isShowSubMenu);
        }
        if (content === 'Our shop') {
            navigate('/shop');
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
    };
    return (
        <a className={menu} href={href} onClick={handleClick}>
            {handleRenderText(content)}
            {isShowSubMenu && (
                <div onClick={handleLogOut} className={subMenu}>
                    LOG OUT
                </div>
            )}
        </a>
    );
}

export default Menu;
