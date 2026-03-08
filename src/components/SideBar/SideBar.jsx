import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import classNames from 'classnames';
import { IoCloseSharp } from 'react-icons/io5';
import Login from '@components/ContentSideBar/Login/Login';
function SideBar() {
    const { container, overLay, sideBar, slideSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen } = useContext(SideBarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={container}>
            {isOpen && <div className={overLay} onClick={handleToggle} />}
            <div
                className={classNames(sideBar, {
                    [slideSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className={boxIcon} onClick={handleToggle}>
                        <IoCloseSharp />
                    </div>
                )}
                <Login />
            </div>
        </div>
    );
}

export default SideBar;
