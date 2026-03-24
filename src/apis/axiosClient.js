import axios from 'axios';
import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SideBarProvider';
// method create cua axios nhan ve 1 doi tuong
const axiosClient = axios.create({
    baseURL: 'https://be-project-reactjs.onrender.com/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});
// tự động lấy token từ cookies
axiosClient.interceptors.request.use(
    async (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;
        // Đánh dấu _retry để tránh lặp vô hạn
        if (error.response?.status === 401 && !originalRequest._retry) {
            // thử request lại
            originalRequest._retry = true;
            const refreshToken = Cookies.get('refreshToken');
            if (!refreshToken) return Promise.reject(error);
            try {
                // Gọi API /refresh-token để đổi lấy token mới
                const res = await axiosClient.post('/refresh-token', {
                    token: refreshToken
                });
                const newAccessToken = res.data.accessToken;
                const newRefreshToken = res.data.refreshToken;
                Cookies.set('token', newAccessToken);
                Cookies.set('refreshToken', newRefreshToken);
                // Tự động gửi lại request ban đầu với token mới
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (error) {
                Cookies.remove('token');
                Cookies.remove('refreshToken');
                Cookies.remove('userId');

                // Try to get sidebar context and open login sidebar
                try {
                    // This is a workaround since we can't use hooks outside React components
                    // We'll use a custom event to trigger login sidebar
                    window.dispatchEvent(new CustomEvent('openLoginSidebar'));
                } catch (e) {
                    // Fallback to redirect if context is not available
                    console.log(
                        'Sidebar context not available, redirecting to home'
                    );
                }

                return Promise.reject(error);
            }
        }
    }
);
export default axiosClient;
