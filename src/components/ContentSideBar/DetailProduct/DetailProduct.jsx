import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import styles from './styles.module.scss';
import SliderCommon from '@components/SliderCommon/SliderCommon';

function DetailProduct() {
    const { detailProduct } = useContext(SideBarContext);
    const { container, title, price, des } = styles;
    return (
        <div className={container}>
            <SliderCommon data={detailProduct?.images || []} />
            <div className={title}>{detailProduct.name}</div>
            <div className={price}>{detailProduct.price}$</div>
            <div className={des}>{detailProduct.description}</div>
            <div className={des}>
                <strong>Material: </strong>
                {detailProduct.material}
                <br />
                <br />
                <strong>Delivery: </strong>
                <span>3 - 5 days</span>
            </div>
        </div>
    );
}

export default DetailProduct;
