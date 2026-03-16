import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getInfo } from '@/apis/authService';
export const StoreContext = createContext();
export const StoreProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [userId, setUserId] = useState(Cookies.get('userId'));
    useEffect(() => {
        if (userId) {
            getInfo(userId)
                .then((res) => {
                    setUserInfo(res.data.data);
                })
                .catch((err) => {
                    console.error('Error fetching user info:', err);
                });
        }
    }, [userId]);
    return (
        <StoreContext.Provider value={{ userInfo, setUserInfo, setUserId }}>
            {children}
        </StoreContext.Provider>
    );
};
