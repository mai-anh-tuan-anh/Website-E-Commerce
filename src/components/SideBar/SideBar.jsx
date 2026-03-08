import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import classNames from 'classnames';
import { IoCloseSharp } from 'react-icons/io5';
import Login from '@components/ContentSideBar/Login/Login';
import Compare from '@components/ContentSideBar/Compare/Compare';
function SideBar() {
    const { container, overLay, sideBar, slideSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen, type } = useContext(SideBarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const handleRenderContent = () => {
        switch (type) {
            case 'login':
                return <Login />;
            case 'compare':
                return <Compare />;
            case 'wishlist':
                return <Login />;
            case 'cart':
                return <Login />;
            default:
                return <Login />;
        }
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
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default SideBar;
