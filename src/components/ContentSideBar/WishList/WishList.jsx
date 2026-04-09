import { TfiHeart } from 'react-icons/tfi';
import styles from './styles.module.scss';
import HeaderSideBar from '../components/HeaderSideBar/HeaderSideBar';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function WishList() {
    const {
        container,
        boxContent,
        buttonWrapper,
        emptyWishlist,
        emptyWishlistIcon,
        emptyWishlistTitle,
        wishlistItem,
        itemImage,
        itemContent,
        itemTitle,
        itemPrice,
        itemSize,
        removeBtn
    } = styles;

    const { wishlist, removeFromWishlist, setIsOpen, setDetailProduct } =
        useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();

    const handleRemoveItem = (productId) => {
        removeFromWishlist(productId);
        toast.info('Removed from wishlist');
    };

    const handleViewProduct = (product) => {
        setDetailProduct(product);
        setIsOpen(false);
        navigate(`/product/${product._id}`);
    };

    const handleAddAllToCart = () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to add items to cart');
            return;
        }
        if (wishlist.length === 0) {
            toast.info('Your wishlist is empty');
            return;
        }
        toast.info('Please add items individually with size selection');
    };

    const handleViewWishlistPage = () => {
        setIsOpen(false);
        navigate('/shop');
    };

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={<TfiHeart style={{ fontSize: '30px' }} />}
                    title={`WISHLIST (${wishlist.length})`}
                />

                {wishlist.length === 0 ? (
                    <div className={emptyWishlist}>
                        <div className={emptyWishlistIcon}>
                            <TfiHeart />
                        </div>
                        <h3 className={emptyWishlistTitle}>
                            Your wishlist is empty
                        </h3>
                    </div>
                ) : (
                    wishlist.map((product) => (
                        <div key={product._id} className={wishlistItem}>
                            <div
                                className={removeBtn}
                                onClick={() => handleRemoveItem(product._id)}
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
                                <div className={itemTitle}>{product.name}</div>
                                {product.size && product.size.length > 0 && (
                                    <div className={itemSize}>
                                        Size:{' '}
                                        {product.size
                                            .map((s) => s.name)
                                            .join(', ')}
                                    </div>
                                )}
                                <div className={itemPrice}>
                                    ${product.price}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {wishlist.length > 0 && (
                <div className={buttonWrapper}>
                    <Button
                        content={'VIEW WISHLIST'}
                        onClick={handleViewWishlistPage}
                    />
                    <Button
                        content={'ADD ALL TO CART'}
                        onClick={handleAddAllToCart}
                    />
                </div>
            )}
        </div>
    );
}

export default WishList;
