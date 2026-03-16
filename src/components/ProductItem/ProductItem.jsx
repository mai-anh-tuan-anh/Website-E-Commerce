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
    const { setIsOpen, setType, handleGetListProductsCart } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const userId = Cookies.get('userId');
    const handleChooseSize = (size) => {
        setSizeChoose((prevSize) => (prevSize === size ? '' : size));
    };
    const handleAddToCart = () => {
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
    return (
        <div className={container}>
            <div className={boxImg}>
                <img src={src} alt='' />
                <img src={prevSrc} alt='' className={revealWhenHover} />
                <div className={showFcWhenHover}>
                    <div className={boxIcon}>
                        <img src={bagIcon} alt='' />
                        <span className={styles.iconTooltip}>Add to cart</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={wishIcon} alt='' />
                        <span className={styles.iconTooltip}>Favorite</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={rotateIcon} alt='' />
                        <span className={styles.iconTooltip}>Compare</span>
                    </div>
                    <div className={boxIcon}>
                        <img src={eyeIcon} alt='' />
                        <span className={styles.iconTooltip}>Review</span>
                    </div>
                </div>
            </div>
            {!isHomepage && details && details.size && (
                <div className={boxSize}>
                    {details.size.map((item, index) => (
                        <div
                            key={index}
                            className={`${size} ${sizeChoose === item.name ? active : ''}`}
                            onClick={() => handleChooseSize(item.name)}
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
                <div className={boxBtn}>
                    <Button
                        content={
                            <>
                                <img
                                    src={bagIcon}
                                    alt=''
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        marginRight: '8px',
                                        filter: 'brightness(3) saturate(100%)'
                                    }}
                                />
                                ADD TO CART
                            </>
                        }
                        onClick={handleAddToCart}
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
