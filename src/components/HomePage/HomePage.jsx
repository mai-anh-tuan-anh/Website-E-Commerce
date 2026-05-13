import MyHeader from '@components/Header/Header';
import Banner from '@components/Banner/Banner';
import styles from './styles.module.scss';
import AdvanceHeading from '@components/AdvanceHeading/AdvanceHeading';
import Info from '@components/Info/Info';

import useProducts from '@/hooks/useProducts';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import SaleHomepage from '@components/SaleHomepage/SaleHomepage';
import MyFooter from '@components/Footer/Footer';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
import ErrorBoundaryTest from '@components/ErrorBoundary/ErrorBoundaryTest';
import {
    SORT_TYPES,
    DEFAULT_PAGE,
    PRODUCT_LIMITS
} from '@/constants/appConstants';

function HomePage() {
    const { container } = styles;

    const query = {
        sortType: SORT_TYPES.NEWEST,
        page: DEFAULT_PAGE,
        limit: PRODUCT_LIMITS.HOMEPAGE
    };

    const { listProducts, isLoading, error } = useProducts(query);

    return (
        <div className={container}>
            <MyHeader />
            <Banner />
            <div className='px-4 sm:px-6 lg:px-8'>
                <ErrorBoundaryTest />
                <Info></Info>
                <AdvanceHeading />

                {isLoading && <LoadingSpinner />}

                {error && <div className={styles.errorMessage}>{error}</div>}

                {!isLoading && !error && (
                    <>
                        <div className='flex justify-center my-5'>
                            <CountdownBanner />
                        </div>
                        <PopularProduct data={listProducts.slice(0, 10)} />
                    </>
                )}
                <SaleHomepage />
                <MyFooter />
            </div>
        </div>
    );
}

export default HomePage;
