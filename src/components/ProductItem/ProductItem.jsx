import Button from '@components/Button/Button';
import { useState, useContext } from 'react';
import styles from './styles.module.scss';
import bagIcon from '@icons/svgs/bagicon.svg';
import eyeIcon from '@icons/svgs/eyeicon.svg';
import rotateIcon from '@icons/svgs/rotateicon.svg';
import wishIcon from '@icons/svgs/wishicon.svg';
import Cookies from 'js-cookie';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { addProductToCart } from '@/apis/cartService';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
function ProductItem({
    src,
    prevSrc,
    name,
    price,
    details,
    isHomepage = true
}) {
    const {
        container,
        boxImg,
        revealWhenHover,
        showFcWhenHover,
        boxIcon,
        title,
        priceBoard,
        priceTitle,
        boxSize,
        size,
        boxBtn,
        active
    } = styles;
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
            toast.warning('Please login to add products to cart');
            return;
        }
        if (!sizeChoose) {
            toast.warning('Please choose a size');
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
                toast.success('Product added to cart');
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
            toast.info('Removed from wishlist');
        } else {
            addToWishlist(details);
            toast.success('Added to wishlist');
        }
    };

    const handleAddToCompare = (e) => {
        e.stopPropagation();
        if (isInCompare(details._id)) {
            removeFromCompare(details._id);
            toast.info('Removed from compare');
        } else {
            const success = addToCompare(details);
            if (success) {
                toast.success('Added to compare');
            } else {
                toast.warning(
                    'Compare list is full (max 4 items) or item already exists'
                );
            }
        }
    };
    return (
        <div className={container} onClick={handleNavigateToDetail}>
            <div className={boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={revealWhenHover} />
                <div className={showFcWhenHover}>
                    <div className={boxIcon} onClick={handleAddToCart}>
                        <img src={bagIcon} alt='' />
                        <span className={styles.iconTooltip}>Add to cart</span>
                    </div>
                    <div
                        className={`${boxIcon} ${isInWishlist(details?._id) ? styles.activeIcon : ''}`}
                        onClick={handleAddToWishlist}
                    >
                        <img src={wishIcon} alt='' />
                        <span className={styles.iconTooltip}>
                            {isInWishlist(details?._id)
                                ? 'Remove from wishlist'
                                : 'Add to wishlist'}
                        </span>
                    </div>
                    <div
                        className={`${boxIcon} ${isInCompare(details?._id) ? styles.activeIcon : ''}`}
                        onClick={handleAddToCompare}
                    >
                        <img src={rotateIcon} alt='' />
                        <span className={styles.iconTooltip}>
                            {isInCompare(details?._id)
                                ? 'Remove from compare'
                                : 'Add to compare'}
                        </span>
                    </div>
                    <div
                        className={boxIcon}
                        onClick={handleShowDetailProductSideBar}
                    >
                        <img src={eyeIcon} alt='' />
                        <span className={styles.iconTooltip}>Quick Review</span>
                    </div>
                </div>
            </div>
            {!isHomepage && details && details.size && (
                <div className={boxSize}>
                    {details.size.map((item, index) => (
                        <div
                            key={index}
                            className={`${size} ${sizeChoose === item.name ? active : ''}`}
                            onClick={(e) => handleChooseSize(e, item.name)}
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}
            <div className={priceBoard}>
                <div className={title}>{name}</div>
                <div className={priceTitle}>{price}$</div>
            </div>
            {!isHomepage && (
                <div className={`${boxBtn} flex justify-center px-4 sm:px-0`}>
                    <Button
                        content={
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    justifyContent: 'center'
                                }}
                            >
                                <img
                                    src={bagIcon}
                                    alt=''
                                    style={{
                                        width: 16,
                                        height: 16,
                                        filter: 'brightness(3) saturate(100%)'
                                    }}
                                />
                                <span>ADD TO CART</span>
                            </div>
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(e);
                        }}
                        disabled={isLoading}
                    />
                </div>
            )}
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                >
                    <LoadingSpinner />
                </div>
            )}
        </div>
    );
}

export default ProductItem;
