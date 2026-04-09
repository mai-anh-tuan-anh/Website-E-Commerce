import { useContext, useState, useEffect } from 'react';
import { SideBarContext } from '@/contexts/SideBarProvider';
import { ToastContext } from '@contexts/ToastProvider';
import styles from './styles.module.scss';
import SliderCommon from '@components/SliderCommon/SliderCommon';
import Cookies from 'js-cookie';
import { addProductToCart } from '@/apis/cartService';
import { getCart } from '@/apis/cartService';
import { getProductById, getProducts } from '@/apis/productsService';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';
import { useNavigate, useParams } from 'react-router-dom';
import ReactImageMagnifier from 'simple-image-magnifier/react';
import {
    FaHome,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
    FaCcAmex,
    FaCcDiscover,
    FaStar
} from 'react-icons/fa';
import MyFooter from '@components/Footer/Footer';
import MyHeader from '@components/Header/Header';

function DetailProduct() {
    const {
        detailProduct,
        setDetailProduct,
        setIsOpen,
        setType,
        handleGetListProductsCart
    } = useContext(SideBarContext);
    const { toast } = useContext(ToastContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        rating: 5,
        title: '',
        comment: '',
        name: '',
        email: ''
    });
    const [productLoading, setProductLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [relatedLoading, setRelatedLoading] = useState(false);
    // Load product data if not available in context
    useEffect(() => {
        if (!detailProduct && id) {
            fetchDataDetail();
        } else if (detailProduct) {
            setProductLoading(false);
        }
    }, [detailProduct, id]);

    // Fetch related products when detailProduct is loaded
    useEffect(() => {
        if (detailProduct) {
            fetchRelatedProducts();
        }
    }, [detailProduct]);

    const fetchDataDetail = async () => {
        try {
            const res = await getProductById(id);
            setDetailProduct(res);
            setProductLoading(false);
        } catch (error) {
            setProductLoading(false);
        }
    };

    const fetchRelatedProducts = async () => {
        if (!detailProduct) return;

        setRelatedLoading(true);
        try {
            // Fetch products with same category, excluding current product
            const query = {
                sortType: '0', // Default sort
                page: 1,
                limit: 8,
                search: detailProduct.category || ''
            };

            const res = await getProducts(query);
            if (res && res.contents) {
                // Filter out current product and limit to 8 items
                const filtered = res.contents
                    .filter((item) => item._id !== detailProduct._id)
                    .slice(0, 8);
                setRelatedProducts(filtered);
            }
        } catch (error) {
            console.error('Error fetching related products:', error);
        } finally {
            setRelatedLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.warning('Please choose a size');
            return;
        }

        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to add products to cart');
            setIsOpen(true);
            setType('login');
            return;
        }

        setIsLoading(true);
        const data = {
            userId: userId,
            productId: detailProduct._id,
            quantity: quantity,
            size: selectedSize
        };

        addProductToCart(data)
            .then((res) => {
                toast.success('Product added to cart successfully!');
                // Auto reload cart products
                const userId = Cookies.get('userId');
                if (userId) {
                    handleGetListProductsCart(userId, 'cart');
                }
            })
            .catch((err) => {
                toast.error(err.message || 'Failed to add product to cart');
            })
            .finally(() => {
                setIsLoading(false);
                setIsOpen(true);
                setType('cart');
            });
    };

    const handleAddToWishlist = () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to add products to wishlist');
            return;
        }
        // TODO: Implement wishlist functionality
        toast.success('Product added to wishlist!');
    };

    const handleAddToCompare = () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to add products to compare');
            return;
        }
        // TODO: Implement compare functionality
        toast.success('Product added to compare!');
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity((prev) => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            toast.warning('Please choose a size');
            return;
        }

        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to continue');
            setIsOpen(true);
            setType('login');
            return;
        }

        // Add to cart first, then navigate to view cart
        handleAddToCart();
        setTimeout(() => {
            navigate('/view-cart');
        }, 1000);
    };

    const handleReviewChange = (field, value) => {
        setReviewForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRatingClick = (rating) => {
        setReviewForm((prev) => ({
            ...prev,
            rating
        }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();

        const userId = Cookies.get('userId');
        if (!userId) {
            toast.warning('Please login to submit a review');
            setIsOpen(true);
            setType('login');
            return;
        }

        // Validate form
        if (!reviewForm.title.trim() || !reviewForm.comment.trim()) {
            toast.warning('Please fill in all required fields');
            return;
        }

        // TODO: Submit review to API
        console.log('Submitting review:', reviewForm);
        toast.success('Review submitted successfully!');

        // Reset form
        setReviewForm({
            rating: 5,
            title: '',
            comment: '',
            name: '',
            email: ''
        });
    };

    if (productLoading) {
        return (
            <div className={`${styles.container} px-4 sm:px-6 lg:px-8`}>
                <div className={styles.loading}>
                    <LoadingSpinner />
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!detailProduct && !productLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.notFound}>
                    <h2>Something's wrong</h2>
                    <p>The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/shop')}
                        className={styles.backButton}
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <MyHeader />
            <div className={styles.container}>
                {/* Navigation Buttons */}
                <div
                    className={`${styles.functionBox} flex mt-20 mb-10 gap-3 flex-row justify-between sm:items-center`}
                >
                    <div>
                        <button
                            onClick={() => navigate('/')}
                            className={styles.btnBack}
                        >
                            <FaHome /> Home
                        </button>
                    </div>
                    <button onClick={handleBack} className={styles.btnBack}>
                        ← Back
                    </button>
                </div>

                <div className={styles.productLayout}>
                    {/* Product Images Section */}
                    <div className={styles.imagesSection}>
                        {detailProduct.images.map((image, index) => (
                            <ReactImageMagnifier
                                srcPreview={image}
                                srcOriginal={image}
                                width={'100%'}
                                height={'100%'}
                                className='max-w-xs bg-gray-200 rounded-lg md:max-w-none max-h-80 md:max-h-none'
                                objectFit='contain'
                            />
                        ))}
                    </div>
                    {/* Product Info Section */}
                    <div className={styles.infoSection}>
                        <h1 className={styles.productName}>
                            {detailProduct.name}
                        </h1>

                        <div className={styles.priceSection}>
                            <span className={styles.currentPrice}>
                                ${detailProduct.price}
                            </span>
                            {detailProduct.originalPrice && (
                                <span className={styles.originalPrice}>
                                    ${detailProduct.originalPrice}
                                </span>
                            )}
                        </div>

                        <p className={styles.description}>
                            {detailProduct.description}
                        </p>

                        {/* Size Selection */}
                        <div className={styles.sizeSection}>
                            <h3>Size</h3>
                            <div className={styles.sizeOptions}>
                                {detailProduct.size?.map((sizeItem) => (
                                    <button
                                        key={sizeItem.name}
                                        className={`${styles.sizeButton} ${selectedSize === sizeItem.name ? styles.selected : ''}`}
                                        onClick={() =>
                                            handleSizeSelect(sizeItem.name)
                                        }
                                    >
                                        {sizeItem.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div className={styles.quantitySection}>
                            <h3>Quantity</h3>
                            <div className={styles.quantityControls}>
                                <button
                                    className={styles.quantityButton}
                                    onClick={() =>
                                        handleQuantityChange('decrease')
                                    }
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type='number'
                                    value={quantity}
                                    readOnly
                                    className={styles.quantityInput}
                                />
                                <button
                                    className={styles.quantityButton}
                                    onClick={() =>
                                        handleQuantityChange('increase')
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button
                                className={styles.addToCartButton}
                                onClick={handleAddToCart}
                                disabled={isLoading}
                            >
                                {isLoading ? <LoadingSpinner /> : 'ADD TO CART'}
                            </button>
                            <button
                                className={styles.buyNowButton}
                                onClick={handleBuyNow}
                                disabled={isLoading}
                            >
                                BUY NOW
                            </button>
                        </div>

                        {/* Action Icons */}
                        <div className={styles.actionIcons}>
                            <button
                                className={styles.iconButton}
                                onClick={handleAddToWishlist}
                            >
                                <span className={styles.iconText}>♡</span>
                                <span className={styles.iconLabel}>
                                    Wishlist
                                </span>
                            </button>
                            <button
                                className={styles.iconButton}
                                onClick={handleAddToCompare}
                            >
                                <span className={styles.iconText}>⇄</span>
                                <span className={styles.iconLabel}>
                                    Compare
                                </span>
                            </button>
                        </div>

                        {/* Payment Security Section */}
                        <div className={styles.paymentSection}>
                            <h3 className={styles.securityTitle}>
                                GUARANTEED SAFE CHECKOUT
                            </h3>
                            <p className={styles.securityText}>
                                Your Payment is 100% Secure
                            </p>
                            <div className={styles.paymentIcons}>
                                <div className={styles.paymentIcon}>
                                    <FaCcVisa size={32} color='#1a1f71' />
                                </div>
                                <div className={styles.paymentIcon}>
                                    <FaCcMastercard size={32} color='#eb001b' />
                                </div>
                                <div className={styles.paymentIcon}>
                                    <FaCcPaypal size={32} color='#003087' />
                                </div>
                                <div className={styles.paymentIcon}>
                                    <FaCcAmex size={32} color='#006fcf' />
                                </div>
                                <div className={styles.paymentIcon}>
                                    <FaCcDiscover size={32} color='#ff6000' />
                                </div>
                                <div className={styles.paymentIcon}>
                                    <span
                                        style={{
                                            fontSize: '32px',
                                            color: '#f7931a'
                                        }}
                                    >
                                        ₿
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className={styles.productDetails}>
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>
                                    Brand:
                                </span>
                                <span className={styles.detailValue}>
                                    {detailProduct.brand || 'N/A'}
                                </span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>SKU:</span>
                                <span className={styles.detailValue}>
                                    {detailProduct.sku || 'N/A'}
                                </span>
                            </div>
                            <div className={styles.detailRow}>
                                <span className={styles.detailLabel}>
                                    Category:
                                </span>
                                <span className={styles.detailValue}>
                                    {detailProduct.category || 'N/A'}
                                </span>
                            </div>
                        </div>

                        {/* Collapsible Sections */}
                        <div className={styles.collapsibleSections}>
                            <div className={styles.collapsibleSection}>
                                <button
                                    className={styles.collapsibleHeader}
                                    onClick={() =>
                                        setShowAdditionalInfo(
                                            !showAdditionalInfo
                                        )
                                    }
                                >
                                    <span>ADDITIONAL INFORMATION</span>
                                    <span className={styles.arrow}>
                                        {showAdditionalInfo ? '−' : '+'}
                                    </span>
                                </button>
                                {showAdditionalInfo && (
                                    <div className={styles.collapsibleContent}>
                                        <div className={styles.detailRow}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Material:
                                            </span>
                                            <span
                                                className={styles.detailValue}
                                            >
                                                {detailProduct.material ||
                                                    'N/A'}
                                            </span>
                                        </div>
                                        <div className={styles.detailRow}>
                                            <span
                                                className={styles.detailLabel}
                                            >
                                                Delivery:
                                            </span>
                                            <span
                                                className={styles.detailValue}
                                            >
                                                3 - 5 days
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className={styles.collapsibleSection}>
                                <button
                                    className={styles.collapsibleHeader}
                                    onClick={() => setShowReviews(!showReviews)}
                                >
                                    <span>REVIEWS (0)</span>
                                    <span className={styles.arrow}>
                                        {showReviews ? '−' : '+'}
                                    </span>
                                </button>
                                {showReviews && (
                                    <div className={styles.collapsibleContent}>
                                        <form
                                            className={styles.reviewForm}
                                            onSubmit={handleSubmitReview}
                                        >
                                            <div
                                                className={styles.reviewRating}
                                            >
                                                <label>Your Rating:</label>
                                                <div
                                                    className={
                                                        styles.starRating
                                                    }
                                                >
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <button
                                                                key={star}
                                                                type='button'
                                                                className={
                                                                    styles.starButton
                                                                }
                                                                onClick={() =>
                                                                    handleRatingClick(
                                                                        star
                                                                    )
                                                                }
                                                            >
                                                                <FaStar
                                                                    size={20}
                                                                    color={
                                                                        star <=
                                                                        reviewForm.rating
                                                                            ? '#ffc107'
                                                                            : '#e0e0e0'
                                                                    }
                                                                />
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <div className={styles.reviewField}>
                                                <label htmlFor='reviewTitle'>
                                                    Review Title *
                                                </label>
                                                <input
                                                    type='text'
                                                    id='reviewTitle'
                                                    value={reviewForm.title}
                                                    onChange={(e) =>
                                                        handleReviewChange(
                                                            'title',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='Summarize your review'
                                                    className={
                                                        styles.reviewInput
                                                    }
                                                    required
                                                />
                                            </div>

                                            <div className={styles.reviewField}>
                                                <label htmlFor='reviewComment'>
                                                    Your Review *
                                                </label>
                                                <textarea
                                                    id='reviewComment'
                                                    value={reviewForm.comment}
                                                    onChange={(e) =>
                                                        handleReviewChange(
                                                            'comment',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='Tell us about your experience with this product'
                                                    className={
                                                        styles.reviewTextarea
                                                    }
                                                    rows={4}
                                                    required
                                                />
                                            </div>

                                            <div className={styles.reviewField}>
                                                <label htmlFor='reviewName'>
                                                    Your Name
                                                </label>
                                                <input
                                                    type='text'
                                                    id='reviewName'
                                                    value={reviewForm.name}
                                                    onChange={(e) =>
                                                        handleReviewChange(
                                                            'name',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='Enter your name'
                                                    className={
                                                        styles.reviewInput
                                                    }
                                                />
                                            </div>

                                            <div className={styles.reviewField}>
                                                <label htmlFor='reviewEmail'>
                                                    Your Email
                                                </label>
                                                <input
                                                    type='email'
                                                    id='reviewEmail'
                                                    value={reviewForm.email}
                                                    onChange={(e) =>
                                                        handleReviewChange(
                                                            'email',
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder='Enter your email'
                                                    className={
                                                        styles.reviewInput
                                                    }
                                                />
                                            </div>

                                            <button
                                                type='submit'
                                                className={
                                                    styles.submitReviewBtn
                                                }
                                            >
                                                Submit Review
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10'>
                    <h2 className='font-bold text-center mb-5 text-2xl'>
                        Related Products
                    </h2>
                    {relatedLoading ? (
                        <div style={{ padding: '40px 0', textAlign: 'center' }}>
                            <LoadingSpinner />
                        </div>
                    ) : relatedProducts.length > 0 ? (
                        <SliderCommon
                            data={relatedProducts.map((item) => ({
                                image: item.images?.[0] || item.image || '',
                                name: item.name,
                                price: item.price,
                                ...item
                            }))}
                            isProductItem
                            showItem={4}
                        />
                    ) : (
                        <p style={{ padding: '20px 0', color: '#666' }}>
                            No related products found.
                        </p>
                    )}
                </div>
            </div>
            <MyFooter />
        </>
    );
}

export default DetailProduct;
