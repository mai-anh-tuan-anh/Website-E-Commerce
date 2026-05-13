import { useState, useEffect } from 'react';
import { getProducts } from '@/apis/productsService';

function useProducts(query = {}) {
    const [listProducts, setListProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const res = await getProducts(query);
                setListProducts(res.contents);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error fetching products:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [JSON.stringify(query)]);

    return { listProducts, isLoading, error };
}

export default useProducts;
