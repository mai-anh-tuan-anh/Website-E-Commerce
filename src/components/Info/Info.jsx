import { dataInfo } from '@components/Info/constants';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
function Info() {
    const { container } = styles;
    return (
        <div>
            <MainLayout>
                <div className={container}>
                    {dataInfo.map((item) => {
                        return (
                            <InfoCard
                                src={item.src}
                                title={item.title}
                                description={item.description}
                            />
                        );
                    })}
                </div>
            </MainLayout>
        </div>
    );
}

export default Info;
