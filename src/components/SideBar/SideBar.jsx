import styles from './styles.module.scss';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import classNames from 'classnames';
import { IoCloseSharp } from 'react-icons/io5';
function SideBar() {
    const { container, overLay, sideBar, slideSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen } = useContext(SideBarContext);
    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div className={container}>
            <div
                className={classNames({ [overLay]: isOpen })}
                onClick={handleToggle}
            />
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
                sideBar
            </div>
        </div>
    );
}

export default SideBar;
