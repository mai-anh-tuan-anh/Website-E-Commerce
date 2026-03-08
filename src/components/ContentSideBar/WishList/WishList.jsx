import { TfiHeart } from 'react-icons/tfi';
import styles from './styles.module.scss';
import HeaderSideBar from '../components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '../components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
function WishList() {
    const { container, boxContent, buttonWrapper } = styles;
    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={<TfiHeart style={{ fontSize: '30px' }} />}
                    title='WISHLIST'
                />
                <ItemProduct />
            </div>
            <div className={buttonWrapper}>
                <Button content={'VIEW WISHLIST'} />
                <Button content={'ADD ALL TO CART'} />
            </div>
        </div>
    );
}

export default WishList;
