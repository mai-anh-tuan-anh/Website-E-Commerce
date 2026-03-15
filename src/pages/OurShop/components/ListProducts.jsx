import MainLayout from '@components/Layout/Layout';
import { useContext, useState } from 'react';
import { OurShopContext } from '@contexts/OurShopProvider';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';

function ListProducts() {
    const { containerProduct, loadMoreBtn } = styles;
    const {
        products,
        page,
        total,
        showId,
        handleBack,
        handleNext,
        searchTerm
    } = useContext(OurShopContext);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <MainLayout>
            <div className={containerProduct}>
                {filteredProducts.map((item) => (
                    <ProductItem
                        key={item.id}
                        src={item.images[0]}
                        prevSrc={item.images[1]}
                        name={item.name}
                        price={item.price}
                        details={item}
                        isHomepage={false}
                    />
                ))}
            </div>
            <div className={loadMoreBtn}>
                <Button
                    content='Back'
                    onClick={handleBack}
                    disabled={page === 1}
                />
                <Button
                    content='Next'
                    onClick={handleNext}
                    disabled={
                        products.length < parseInt(showId) ||
                        page * parseInt(showId) >= total
                    }
                />
            </div>
        </MainLayout>
    );
}

export default ListProducts;
