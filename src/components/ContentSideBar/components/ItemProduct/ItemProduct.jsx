import styles from './styles.module.scss';
import { IoIosCloseCircleOutline } from 'react-icons/io';
function ItemProduct() {
    const { container, boxContent, title, price, boxClose } = styles;
    return (
        <div className={container}>
            <img src='a' alt='img' />
            <div className={boxClose}>
                <IoIosCloseCircleOutline style={{ fontSize: '20px' }} />
            </div>
            <div className={boxContent}>
                <div className={title}>Title</div>
                <div className={price}>Price</div>
            </div>
        </div>
    );
}

export default ItemProduct;
