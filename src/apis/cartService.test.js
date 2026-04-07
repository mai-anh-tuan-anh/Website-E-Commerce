/**
 * VÍ DỤ 4: Test API Services
 * ==========================
 * 
 * Test cartService - Mock axios để không gọi API thật
 */

import { vi, describe, test, expect, beforeEach } from 'vitest';
import { addProductToCart, getCart, deleteItem } from './cartService';
import axiosClient from './axiosClient';

// Mock axiosClient module
vi.mock('./axiosClient', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        delete: vi.fn()
    }
}));

describe('cartService', () => {
    // Reset mocks trước mỗi test
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('addProductToCart', () => {
        test('calls axios.post with correct endpoint and data', async () => {
            const mockData = {
                userId: 'user-123',
                productId: 'product-456',
                quantity: 2,
                size: 'L'
            };
            
            // Setup mock response
            const mockResponse = { data: { success: true, cartId: 'cart-789' } };
            axiosClient.post.mockResolvedValue(mockResponse);
            
            // Gọi function
            const result = await addProductToCart(mockData);
            
            // Kiểm tra axios.post được gọi với đúng params
            expect(axiosClient.post).toHaveBeenCalledWith('/cart', mockData);
            expect(axiosClient.post).toHaveBeenCalledTimes(1);
            
            // Kiểm tra trả về đúng data
            expect(result).toEqual(mockResponse);
        });

        test('handles error correctly', async () => {
            const mockData = { userId: 'user-123', productId: 'product-456' };
            const mockError = new Error('Network error');
            
            axiosClient.post.mockRejectedValue(mockError);
            
            // Kiểm tra error được throw
            await expect(addProductToCart(mockData)).rejects.toThrow('Network error');
        });
    });

    describe('getCart', () => {
        test('calls axios.get with correct endpoint', async () => {
            const userId = 'user-123';
            const mockResponse = { 
                data: { 
                    data: [
                        { id: 1, name: 'Product 1', price: 99 }
                    ] 
                } 
            };
            
            axiosClient.get.mockResolvedValue(mockResponse);
            
            const result = await getCart(userId);
            
            expect(axiosClient.get).toHaveBeenCalledWith('/cart/user-123');
            expect(result).toEqual(mockResponse);
        });
    });

    describe('deleteItem', () => {
        test('calls axios.delete with correct endpoint and body', async () => {
            const mockBody = {
                userId: 'user-123',
                productId: 'product-456'
            };
            
            const mockResponse = { data: { success: true } };
            axiosClient.delete.mockResolvedValue(mockResponse);
            
            const result = await deleteItem(mockBody);
            
            expect(axiosClient.delete).toHaveBeenCalledWith(
                '/cart/deleteItem', 
                { data: mockBody }
            );
            expect(result).toEqual(mockResponse);
        });
    });
});

/**
 * TÓM TẮT TEST API:
 * 
 * 1. Mock axiosClient để không gọi API thật
 * 2. Setup mock response cho từng test case
 * 3. Kiểm tra function được gọi với đúng params
 * 4. Kiểm tra return value
 * 5. Kiểm tra error handling
 */
