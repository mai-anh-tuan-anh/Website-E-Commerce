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
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

function HomePage() {
    const [listProducts, setListProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Query parameters for HomePage
                const query = {
                    sortType: '0', // Default sort (newest)
                    page: 1,
                    limit: '12' // Get 12 products for homepage
                };

                const res = await getProducts(query);
                setListProducts(res.contents);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);
    const { container } = styles;
    return (
        <div className={`${container} px-4 sm:px-6 lg:px-8`}>
            <MyHeader />
            <Banner />
            <Info></Info>
            <AdvanceHeading />

            {/* Loading State */}
            {isLoading && <LoadingSpinner />}

            {/* Error State */}
            {error && <div className={styles.errorMessage}>{error}</div>}

            {/* Content - only show when not loading and no error */}
            {!isLoading && !error && (
                <>
                    <HeadingListProduct data={listProducts.slice(0, 2)} />
                    <PopularProduct data={listProducts.slice(2, 10)} />
                </>
            )}
            <SaleHomepage />
            <MyFooter />
        </div>
    );
}

export default HomePage;
