import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
import ProductItem from '@components/ProductItem/ProductItem';
function HeadingListProduct() {
    const { container, containerItem } = styles;
    return (
        <MainLayout>
            <div className={container}>
                <CountdownBanner />
                <div className={containerItem}>
                    <ProductItem />
                    <ProductItem />
                </div>
            </div>
            <div className={containerItem}>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
            <div className={containerItem}>
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </MainLayout>
    );
}

export default HeadingListProduct;
