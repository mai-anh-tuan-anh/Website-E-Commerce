import MyHeader from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Banner from '@pages/OurShop/components/Banner';
import { FaHome } from 'react-icons/fa';
function OurShop() {
    const { container, functionBox, btnBack, breadcrumbBtn } = styles;
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <>
            <MyHeader />
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
            </MainLayout>
        </>
    );
}

export default OurShop;
