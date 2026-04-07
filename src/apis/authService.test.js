import { vi, describe, test, expect, beforeEach } from 'vitest';
import { register, signIn, getInfo } from './authService';
import axiosClient from './axiosClient';

vi.mock('./axiosClient', () => ({
    default: {
        post: vi.fn(),
        get: vi.fn()
    }
}));

describe('authService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('register', () => {
        test('calls axios.post with /register and body', async () => {
            const body = {
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User'
            };
            const mockResponse = { data: { id: 'user-123', email: body.email } };
            axiosClient.post.mockResolvedValue(mockResponse);

            const result = await register(body);

            expect(axiosClient.post).toHaveBeenCalledWith('/register', body);
            expect(axiosClient.post).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockResponse);
        });

        test('handles register error', async () => {
            const body = { email: 'test@example.com', password: '123' };
            const error = new Error('Email already exists');
            axiosClient.post.mockRejectedValue(error);

            await expect(register(body)).rejects.toThrow('Email already exists');
        });
    });

    describe('signIn', () => {
        test('calls axios.post with /login and credentials', async () => {
            const body = { email: 'test@example.com', password: 'password123' };
            const mockResponse = {
                data: {
                    token: 'access-token-123',
                    refreshToken: 'refresh-token-456',
                    userId: 'user-123'
                }
            };
            axiosClient.post.mockResolvedValue(mockResponse);

            const result = await signIn(body);

            expect(axiosClient.post).toHaveBeenCalledWith('/login', body);
            expect(result).toEqual(mockResponse);
        });

        test('handles invalid credentials', async () => {
            const body = { email: 'wrong@example.com', password: 'wrongpass' };
            const error = new Error('Invalid credentials');
            axiosClient.post.mockRejectedValue(error);

            await expect(signIn(body)).rejects.toThrow('Invalid credentials');
        });
    });

    describe('getInfo', () => {
        test('calls axios.get with /user/info/{userId}', async () => {
            const userId = 'user-123';
            const mockResponse = {
                data: {
                    id: userId,
                    name: 'Test User',
                    email: 'test@example.com'
                }
            };
            axiosClient.get.mockResolvedValue(mockResponse);

            const result = await getInfo(userId);

            expect(axiosClient.get).toHaveBeenCalledWith(`/user/info/${userId}`);
            expect(result).toEqual(mockResponse);
        });
    });
});
