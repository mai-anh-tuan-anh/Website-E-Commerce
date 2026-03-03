import MyHeader from '@components/Header/Header';
import Banner from '@components/Banner/Banner';
import styles from './styles.module.scss';
import AdvanceHeading from '@components/AdvanceHeading/AdvanceHeading';
import Info from '@components/Info/Info';
import HeadingListProduct from '@components/HeadingListProduct/HeadingListProduct';
import { useEffect, useState } from 'react';
import { getProducts } from '@/apis/productsService';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import SaleHomepage from '@components/SaleHomepage/SaleHomepage';
import MyFooter from '@components/Footer/Footer';
function HomePage() {
    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        getProducts().then((res) => setListProducts(res.contents));
    }, []);
    const { container } = styles;
    return (
        <div>
            <div className={container}>
                <MyHeader />
                <Banner />
                <Info></Info>
                <AdvanceHeading />
                <HeadingListProduct data={listProducts.slice(0, 2)} />
                <PopularProduct data={listProducts.slice(2, 10)} />
                <SaleHomepage />
                <MyFooter />
            </div>
        </div>
    );
}

export default HomePage;
