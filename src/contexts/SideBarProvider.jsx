import { createContext, useEffect, useState } from 'react';
import { getCart, deleteItem } from '@/apis/cartService';
import Cookies from 'js-cookie';
export const SideBarContext = createContext();
export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
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
        window.location.href = '/login';
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
                    // Fallback: remove from local state even if API fails
                    setListProductCart((prevItems) =>
                        prevItems.filter((_, index) => index !== itemId)
                    );
                });
        } else {
            // Fallback for demo purposes
            setListProductCart((prevItems) =>
                prevItems.filter((_, index) => index !== itemId)
            );
        }
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
                removeCartItem
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
