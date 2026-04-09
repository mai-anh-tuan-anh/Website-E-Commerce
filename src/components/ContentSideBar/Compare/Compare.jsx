import HeaderSideBar from '../components/HeaderSideBar/HeaderSideBar';
import { TfiReload } from 'react-icons/tfi';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

function Compare() {
    const {
        container,
        boxContent,
        buttonWrapper,
        emptyCompare,
        emptyCompareIcon,
        emptyCompareTitle,
        compareItem,
        itemImage,
        itemContent,
        itemTitle,
        itemPrice,
        itemSpecs,
        removeBtn,
        clearAllBtn,
        viewProductBtn
    } = styles;
    const {
        compareList,
        removeFromCompare,
        clearCompare,
        setIsOpen,
        setDetailProduct
    } = useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleRemoveItem = (productId) => {
        removeFromCompare(productId);
        toast.info('Removed from compare');
    };

    const handleClearAll = () => {
        clearCompare();
        toast.info('Compare list cleared');
    };

    const handleViewProduct = (product) => {
        setDetailProduct(product);
        setIsOpen(false);
        navigate(`/product/${product._id}`);
    };

    const handleViewComparePage = () => {
        setIsOpen(false);
        navigate('/shop');
    };

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={<TfiReload style={{ fontSize: '30px' }} />}
                    title={`COMPARE (${compareList.length})`}
                />

                {compareList.length === 0 ? (
                    <div className={emptyCompare}>
                        <div className={emptyCompareIcon}>
                            <TfiReload />
                        </div>
                        <h3 className={emptyCompareTitle}>
                            No products to compare
                        </h3>
                    </div>
                ) : (
                    <>
                        {compareList.map((product) => (
                            <div key={product._id} className={compareItem}>
                                <div
                                    className={removeBtn}
                                    onClick={() =>
                                        handleRemoveItem(product._id)
                                    }
                                >
                                    <IoIosCloseCircleOutline
                                        style={{ fontSize: '20px' }}
                                    />
                                </div>
                                <img
                                    src={
                                        product.images?.[0] ||
                                        '/placeholder-image.jpg'
                                    }
                                    alt={product.name}
                                    className={itemImage}
                                />
                                <div className={itemContent}>
                                    <div className={itemTitle}>
                                        {product.name}
                                    </div>
                                    <div className={itemPrice}>
                                        ${product.price}
                                    </div>
                                    <div className={itemSpecs}>
                                        {product.size && (
                                            <span>
                                                Sizes:{' '}
                                                {product.size
                                                    .map((s) => s.name)
                                                    .join(', ')}
                                            </span>
                                        )}
                                        {product.material && (
                                            <span>
                                                Material: {product.material}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        className={viewProductBtn}
                                        onClick={() =>
                                            handleViewProduct(product)
                                        }
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {compareList.length > 0 && (
                <div className={buttonWrapper}>
                    <Button content={'CLEAR ALL'} onClick={handleClearAll} />
                </div>
            )}
        </div>
    );
}

export default Compare;
