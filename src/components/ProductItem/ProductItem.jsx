import { useState, useContext } from 'react';
import styles from './styles.module.scss';
import Cookies from 'js-cookie';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { addProductToCart } from '@/apis/cartService';
import { useNavigate } from 'react-router-dom';
import { TOAST_MESSAGES } from '@/constants/appConstants';

import ProductImage from './components/ProductImage';
import ProductSizeSelector from './components/ProductSizeSelector';
import ProductInfo from './components/ProductInfo';
import ProductAddToCartButton from './components/ProductAddToCartButton';
import LoadingOverlay from './components/LoadingOverlay';

function ProductItem({
    src,
    prevSrc,
    name,
    price,
    details,
    isHomepage = true
}) {
    const { container } = styles;
    const [sizeChoose, setSizeChoose] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        setIsOpen,
        setType,
        handleGetListProductsCart,
        setDetailProduct,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        addToCompare,
        removeFromCompare,
        isInCompare
    } = useContext(SideBarContext);

    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const navigate = useNavigate();

    const handleChooseSize = (e, size) => {
        e.stopPropagation();
        setSizeChoose((prevSize) => (prevSize === size ? '' : size));
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        if (!userId) {
            setIsOpen(true);
            setType('login');
            toast.warning(TOAST_MESSAGES.LOGIN_REQUIRED);
            return;
        }
        if (!sizeChoose) {
            toast.warning(TOAST_MESSAGES.SIZE_REQUIRED);
            return;
        }
        setIsLoading(true);
        const data = {
            userId: userId,
            productId: details._id,
            quantity: 1,
            size: sizeChoose
        };

        addProductToCart(data)
            .then((res) => {
                setIsOpen(true);
                setType('cart');
                handleGetListProductsCart(userId, 'cart');
                toast.success(TOAST_MESSAGES.ADD_TO_CART_SUCCESS);
            })
            .catch((err) => {
                toast.error(err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleShowDetailProductSideBar = (e) => {
        e.stopPropagation();
        setIsOpen(true);
        setType('detail');
        setDetailProduct(details);
    };

    const handleNavigateToDetail = () => {
        setDetailProduct(details);
        navigate(`/product/${details._id}`);
    };

    const handleAddToWishlist = (e) => {
        e.stopPropagation();
        if (isInWishlist(details._id)) {
            removeFromWishlist(details._id);
            toast.info(TOAST_MESSAGES.REMOVE_FROM_WISHLIST);
        } else {
            addToWishlist(details);
            toast.success(TOAST_MESSAGES.ADD_TO_WISHLIST_SUCCESS);
        }
    };

    const handleAddToCompare = (e) => {
        e.stopPropagation();
        if (isInCompare(details._id)) {
            removeFromCompare(details._id);
            toast.info(TOAST_MESSAGES.REMOVE_FROM_COMPARE);
        } else {
            const success = addToCompare(details);
            if (success) {
                toast.success(TOAST_MESSAGES.ADD_TO_COMPARE_SUCCESS);
            } else {
                toast.warning(TOAST_MESSAGES.COMPARE_LIST_FULL);
            }
        }
    };

    return (
        <div className={container} onClick={handleNavigateToDetail}>
            <ProductImage
                src={src}
                prevSrc={prevSrc}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                onAddToCompare={handleAddToCompare}
                onQuickView={handleShowDetailProductSideBar}
                isInWishlist={isInWishlist(details?._id)}
                isInCompare={isInCompare(details?._id)}
            />

            {!isHomepage && details && details.size && (
                <ProductSizeSelector
                    sizes={details.size}
                    selectedSize={sizeChoose}
                    onSizeSelect={handleChooseSize}
                />
            )}

            <ProductInfo name={name} price={price} />

            {!isHomepage && (
                <ProductAddToCartButton
                    onAddToCart={(e) => {
                        e.stopPropagation();
                        handleAddToCart(e);
                    }}
                    isLoading={isLoading}
                />
            )}

            {isLoading && <LoadingOverlay />}
        </div>
    );
}

export default ProductItem;
