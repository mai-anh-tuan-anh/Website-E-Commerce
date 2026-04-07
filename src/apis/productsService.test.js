import { vi, describe, test, expect, beforeEach } from 'vitest';
import { getProducts, getProductById } from './productsService';
import axiosClient from './axiosClient';

vi.mock('./axiosClient', () => ({
    default: {
        get: vi.fn()
    }
}));

describe('productsService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getProducts', () => {
        test('calls correct endpoint with default query params', async () => {
            const query = { sortType: 'popular', page: 1, limit: 10 };
            const mockData = {
                data: [
                    { _id: '1', name: 'Product 1', price: 100 },
                    { _id: '2', name: 'Product 2', price: 200 }
                ],
                total: 2
            };
            axiosClient.get.mockResolvedValue({ data: mockData });

            const result = await getProducts(query);

            expect(axiosClient.get).toHaveBeenCalledWith(
                '/product?sortType=popular&page=1&limit=10'
            );
            expect(result).toEqual(mockData);
        });

        test('handles limit=all (no limit param)', async () => {
            const query = { sortType: 'newest', page: 1, limit: 'all' };
            const mockData = { data: [], total: 0 };
            axiosClient.get.mockResolvedValue({ data: mockData });

            await getProducts(query);

            expect(axiosClient.get).toHaveBeenCalledWith(
                '/product?sortType=newest&page=1'
            );
        });

        test('includes search query when provided', async () => {
            const query = {
                sortType: 'price',
                page: 1,
                limit: 20,
                search: 'nike shoes'
            };
            const mockData = { data: [], total: 0 };
            axiosClient.get.mockResolvedValue({ data: mockData });

            await getProducts(query);

            expect(axiosClient.get).toHaveBeenCalledWith(
                '/product?sortType=price&page=1&limit=20&search=nike%20shoes'
            );
        });

        test('handles special characters in search', async () => {
            const query = { sortType: 'popular', page: 1, limit: 10, search: 'a&b=c' };
            const mockData = { data: [], total: 0 };
            axiosClient.get.mockResolvedValue({ data: mockData });

            await getProducts(query);

            expect(axiosClient.get).toHaveBeenCalledWith(
                '/product?sortType=popular&page=1&limit=10&search=a%26b%3Dc'
            );
        });

        test('returns only response data (not full response)', async () => {
            const query = { sortType: 'popular', page: 1, limit: 10 };
            const mockData = { products: [], total: 100 };
            axiosClient.get.mockResolvedValue({
                data: mockData,
                status: 200,
                headers: {}
            });

            const result = await getProducts(query);

            expect(result).toEqual(mockData);
            expect(result).not.toHaveProperty('status');
        });
    });

    describe('getProductById', () => {
        test('calls correct endpoint with product id', async () => {
            const id = 'product-123';
            const mockData = {
                _id: id,
                name: 'Test Product',
                price: 99.99,
                description: 'A test product'
            };
            axiosClient.get.mockResolvedValue({ data: mockData });

            const result = await getProductById(id);

            expect(axiosClient.get).toHaveBeenCalledWith(`/product/${id}`);
            expect(result).toEqual(mockData);
        });

        test('handles non-existent product', async () => {
            const id = 'non-existent';
            const error = new Error('Product not found');
            error.response = { status: 404 };
            axiosClient.get.mockRejectedValue(error);

            await expect(getProductById(id)).rejects.toThrow('Product not found');
        });
    });
});
