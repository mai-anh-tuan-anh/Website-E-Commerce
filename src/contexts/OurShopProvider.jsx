import { createContext, useState } from 'react';
export const OurShopContext = createContext();
export const OurShopProvider = ({ children }) => {
    const sortOptions = [
        { value: '0', label: 'Default' },
        { value: '1', label: 'Sort by popularity' },
        { value: '2', label: 'Sort by rating' },
        { value: '3', label: 'Sort by latest' },
        { value: '4', label: 'Sort by price: Low to High' },
        { value: '5', label: 'Sort by price: High to Low' }
    ];
    const showOptions = [
        { value: 8, label: 'Show 8' },
        { value: 12, label: 'Show 12' },
        { value: 'all', label: 'Show all' }
    ];
    const [sortId, setSortId] = useState('0');
    const [showId, setShowId] = useState('8');
    return (
        <OurShopContext.Provider
            value={{
                sortOptions,
                showOptions,
                sortId,
                showId,
                setSortId,
                setShowId
            }}
        >
            {children}
        </OurShopContext.Provider>
    );
};
