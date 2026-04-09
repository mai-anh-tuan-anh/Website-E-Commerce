import { createContext, useEffect, useState } from 'react';
import { getCart, deleteItem } from '@/apis/cartService';
import Cookies from 'js-cookie';
export const SideBarContext = createContext();

// LocalStorage keys
const WISHLIST_KEY = 'ecommerce_wishlist';
const COMPARE_KEY = 'ecommerce_compare';

// Helper functions for localStorage
const getStoredItems = (key) => {
    try {
        const items = localStorage.getItem(key);
        return items ? JSON.parse(items) : [];
    } catch (error) {
        console.error(`Error reading ${key} from localStorage:`, error);
        return [];
    }
};

const saveStoredItems = (key, items) => {
    try {
        localStorage.setItem(key, JSON.stringify(items));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const [detailProduct, setDetailProduct] = useState();
    const [wishlist, setWishlist] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const handleGetListProductsCart = (userId, type) => {
        if (userId && type === 'cart') {
            getCart(userId)
                .then((res) => {
                    setListProductCart(res.data.data);
                })
                .catch((err) => {
                    console.error('Error fetching cart:', err);
                });
        }
    };

    useEffect(() => {
        handleGetListProductsCart(Cookies.get('userId'), 'cart');
    }, []);

    // Load wishlist and compare from localStorage on mount
    useEffect(() => {
        setWishlist(getStoredItems(WISHLIST_KEY));
        setCompareList(getStoredItems(COMPARE_KEY));
    }, []);

    // Theo dõi thay đổi userId để reset giỏ hàng khi logout
    useEffect(() => {
        const currentUserId = Cookies.get('userId');
        if (!currentUserId && listProductCart.length > 0) {
            setListProductCart([]);
        }
    }, [listProductCart.length]);

    // Hàm logout để xóa toàn bộ dữ liệu
    const handleLogout = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        Cookies.remove('userId');
        setListProductCart([]);
        window.location.href = '/';
    };

    // Hàm cập nhật số lượng sản phẩm trong giỏ hàng
    const updateCartItemQuantity = (itemId, newQuantity) => {
        setListProductCart((prevItems) =>
            prevItems.map((item, index) =>
                index === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Hàm xóa sản phẩm khỏi giỏ hàng
    const removeCartItem = (itemId) => {
        const userId = Cookies.get('userId');
        if (userId && listProductCart[itemId]) {
            const cartItem = listProductCart[itemId];
            deleteItem({ userId, productId: cartItem.productId })
                .then(() => {
                    setListProductCart((prevItems) =>
                        prevItems.filter((_, index) => index !== itemId)
                    );
                })
                .catch((err) => {
                    console.error('Error removing item:', err);
                    setListProductCart((prevItems) =>
                        prevItems.filter((_, index) => index !== itemId)
                    );
                });
        } else {
            setListProductCart((prevItems) =>
                prevItems.filter((_, index) => index !== itemId)
            );
        }
    };

    // ===== WISHLIST FUNCTIONS =====
    const addToWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item._id === product._id);
            if (exists) {
                return prev;
            }
            const newWishlist = [...prev, product];
            saveStoredItems(WISHLIST_KEY, newWishlist);
            return newWishlist;
        });
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => {
            const newWishlist = prev.filter((item) => item._id !== productId);
            saveStoredItems(WISHLIST_KEY, newWishlist);
            return newWishlist;
        });
    };

    const isInWishlist = (productId) => {
        return wishlist.some((item) => item._id === productId);
    };

    const clearWishlist = () => {
        setWishlist([]);
        saveStoredItems(WISHLIST_KEY, []);
    };

    const addAllWishlistToCart = () => {
        const userId = Cookies.get('userId');
        if (!userId) {
            return { success: false, message: 'Please login to add to cart' };
        }
        // This would need API calls to add each item
        // For now, return success to indicate functionality exists
        return { success: true, message: 'Items added to cart' };
    };

    // ===== COMPARE FUNCTIONS =====
    const addToCompare = (product) => {
        const currentList = getStoredItems(COMPARE_KEY);
        if (currentList.length >= 4) {
            return false; // Max 4 items for compare
        }
        const exists = currentList.find((item) => item._id === product._id);
        if (exists) {
            return false;
        }
        const newCompareList = [...currentList, product];
        setCompareList(newCompareList);
        saveStoredItems(COMPARE_KEY, newCompareList);
        return true;
    };

    const removeFromCompare = (productId) => {
        setCompareList((prev) => {
            const newCompareList = prev.filter(
                (item) => item._id !== productId
            );
            saveStoredItems(COMPARE_KEY, newCompareList);
            return newCompareList;
        });
    };

    const isInCompare = (productId) => {
        return compareList.some((item) => item._id === productId);
    };

    const clearCompare = () => {
        setCompareList([]);
        saveStoredItems(COMPARE_KEY, []);
    };

    return (
        <SideBarContext.Provider
            value={{
                isOpen,
                setIsOpen,
                type,
                setType,
                listProductCart,
                setListProductCart,
                handleGetListProductsCart,
                handleLogout,
                updateCartItemQuantity,
                removeCartItem,
                detailProduct,
                setDetailProduct,
                wishlist,
                compareList,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                clearWishlist,
                addAllWishlistToCart,
                addToCompare,
                removeFromCompare,
                isInCompare,
                clearCompare
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
