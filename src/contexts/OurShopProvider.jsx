import { createContext, useEffect, useState } from 'react';
import { getProducts } from '../apis/productsService';
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
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); // Reset to first page when searching
        const query = {
            sortType: sortId,
            page: 1,
            limit: showId,
            search: term
        };
        getProducts(query)
            .then((res) => {
                setProducts(res.contents);
                setTotal(res.total);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    };

    const handleNext = () => {
        const nextPage = page + 1;
        const query = {
            sortType: sortId,
            page: nextPage,
            limit: showId,
            search: searchTerm
        };
        getProducts(query)
            .then((res) => {
                setProducts(res.contents);
                setPage(nextPage);
                setTotal(res.total);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    };

    const handleBack = () => {
        if (page > 1) {
            const prevPage = page - 1;
            const query = {
                sortType: sortId,
                page: prevPage,
                limit: showId,
                search: searchTerm
            };
            getProducts(query)
                .then((res) => {
                    setProducts(res.contents);
                    setPage(prevPage);
                    setTotal(res.total);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        const query = {
            sortType: sortId,
            page,
            limit: showId,
            search: searchTerm
        };
        getProducts(query)
            .then((res) => {
                setProducts(res.contents);
                setTotal(res.total);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
            });
    }, [sortId, showId, searchTerm]);
    return (
        <OurShopContext.Provider
            value={{
                sortOptions,
                showOptions,
                sortId,
                showId,
                setSortId,
                setShowId,
                searchTerm,
                handleSearch,
                products,
                page,
                total,
                handleBack,
                handleNext
            }}
        >
            {children}
        </OurShopContext.Provider>
    );
};
