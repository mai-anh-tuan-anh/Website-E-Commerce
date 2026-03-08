import styles from '../styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
function Menu({ content, href }) {
    const { menu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const handleClick = () => {
        if (content === 'Sign In') {
            setType('login');
            setIsOpen(true);
        }
    };
    return (
        <a className={menu} href={href} onClick={handleClick}>
            {content}
        </a>
    );
}

export default Menu;
