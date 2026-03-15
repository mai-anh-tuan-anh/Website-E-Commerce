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

function OurShopContent() {
    const { container, functionBox, btnBack } = styles;
    const navigate = useNavigate();
    const { showId } = useContext(OurShopContext);

    const handleBack = () => {
        navigate(-1);
    };

    return (
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
                    <button onClick={() => handleBack()} className={btnBack}>
                        ← Back
                    </button>
                </div>
            </div>
            <Banner />
            <div>
                <Filter />
            </div>
            <div
                className='products-container'
                style={{
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '20px',
                    padding: '20px 0'
                }}
            >
                <p style={{ textAlign: 'center', gridColumn: '1/-1' }}>
                    Chưa có sản phẩm nào
                </p>
            </div>
        </MainLayout>
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
