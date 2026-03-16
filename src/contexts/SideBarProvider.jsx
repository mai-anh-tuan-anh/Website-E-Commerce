import { createContext, useState } from 'react';
import { getCart } from '@/apis/cartService';
export const SideBarContext = createContext();
export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState('');
    const [listProductCart, setListProductCart] = useState([]);
    const handleGetListProductsCart = (userId, type) => {
        if (userId && type === 'cart') {
            getCart(userId)
                .then((res) => {
                    console.log('API Response:', res.data);
                    setListProductCart(res.data.data);
                    console.log(
                        'State updated, listProductCart now:',
                        res.data.data
                    );
                })
                .catch((error) => {
                    console.error('Error getting cart:', error);
                    setListProductCart([]);
                });
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
                handleGetListProductsCart
            }}
        >
            {children}
        </SideBarContext.Provider>
    );
};
