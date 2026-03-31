import { dataInfo } from '@components/Info/constants';
import InfoCard from '@components/Info/InfoCard/InfoCard';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
function Info() {
    const { container } = styles;
    return (
        <div>
            <MainLayout>
                <div
                    className={`${container} -mt-[75px] flex flex-col items-center gap-4 px-4 py-5 md:flex-row md:items-start md:justify-between md:gap-0 md:px-[55px]`}
                >
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
