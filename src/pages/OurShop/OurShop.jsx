import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Banner from '@pages/OurShop/components/Banner';
import { FaHome } from 'react-icons/fa';
import { OurShopProvider } from '@contexts/OurShopProvider';
import Filter from './components/Filter';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import ListProducts from './components/ListProducts';
import MyFooter from '@components/Footer/Footer';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

function OurShopContent() {
    const { container, functionBox, btnBack } = styles;
    const navigate = useNavigate();
    const { showId, isLoading } = useContext(OurShopContext);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <MainLayout>
                <div className={container}>
                    <div className={functionBox}>
                        <div>
                            <button
                                onClick={() => navigate('/')}
                                className={btnBack}
                            >
                                <FaHome /> Home
                            </button>
                        </div>
                        <button
                            onClick={() => handleBack()}
                            className={btnBack}
                        >
                            ← Back
                        </button>
                    </div>
                </div>
                <Banner />
                <div>
                    <Filter />
                    {isLoading && <LoadingSpinner />}
                    <ListProducts />
                </div>
            </MainLayout>
            <MyFooter />
        </>
    );
}

function OurShop() {
    return (
        <OurShopProvider>
            <MyHeader />
            <OurShopContent />
        </OurShopProvider>
    );
}

export default OurShop;
