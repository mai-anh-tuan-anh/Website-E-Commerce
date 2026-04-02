import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
import ProductItem from '@components/ProductItem/ProductItem';
function HeadingListProduct({ data }) {
    const { container, containerItem } = styles;
    return (
        <MainLayout>
            <div
                className={`${container} flex flex-col items-stretch gap-2 md:flex-row md:items-start`}
            >
                <CountdownBanner className='md:ml-5' />
                <div
                    className={`${containerItem} flex w-full flex-wrap justify-around gap-2`}
                >
                    {data.map((item) => (
                        <ProductItem
                            key={item.id}
                            src={item.images[0]}
                            prevSrc={item.images[1]}
                            name={item.name}
                            price={item.price}
                            details={item}
                        />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}

export default HeadingListProduct;
