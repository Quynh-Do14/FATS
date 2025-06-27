// axiosInstance.ts (đã fix popup browser)

import axios from 'axios';
import Cookies from 'js-cookie';
import { notification } from 'antd';
import { Endpoint } from '../common/apiLink';
import { ROUTE_PATH } from '../common/appRouter';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest', // <- thêm để browser hiểu đây là XHR
    },
    timeout: 15000,
    withCredentials: true, // chỉ giữ nếu BE đã config đúng CORS cho credentials
});

// Hàm lấy từng token riêng
const getAccessToken = () => Cookies.get('accessToken');
const getRefreshToken = () => Cookies.get('refreshToken');

const setTokens = (accessToken: string, refreshToken: string) => {
    Cookies.set('accessToken', accessToken, {
        path: '/', secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: 7,
    });
    Cookies.set('refreshToken', refreshToken, {
        path: '/', secure: process.env.NODE_ENV === 'production', sameSite: 'Strict', expires: 7,
    });
};

const clearTokens = () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
};

// Biến kiểm soát refresh token đồng thời
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

// Request interceptor — gắn accessToken vào headers
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — xử lý lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Nếu request bị cancel hoặc lỗi mạng -> bỏ qua (không xử lý 401)
        if (!error.response) {
            return Promise.reject(error);
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshToken = getRefreshToken();
                    if (!refreshToken) {
                        throw new Error('No refresh token found');
                    }

                    const response = await axios.post(`${baseURL}${Endpoint.Auth.RefreshToken}`, {
                        refreshToken: refreshToken,
                    }, {
                        headers: { 'X-Requested-With': 'XMLHttpRequest' }, // <- đảm bảo luôn có
                        withCredentials: true,
                    });

                    if (!response?.data?.accessToken || !response?.data?.refreshToken) {
                        throw new Error('Invalid refresh response');
                    }

                    const { accessToken, refreshToken: newRefreshToken } = response.data;
                    setTokens(accessToken, newRefreshToken);

                    processQueue(null, accessToken);

                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);

                } catch (err) {
                    processQueue(err, null);
                    clearTokens();
                    // notification.error({
                    //     message: 'Thông báo',
                    //     description: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
                    // });
                    if (window.location.pathname !== ROUTE_PATH.LOGIN) {
                        window.location.href = ROUTE_PATH.LOGIN;
                    }
                    return Promise.reject(err);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve, reject) => {
                failedQueue.push({
                    resolve: (token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axiosInstance(originalRequest));
                    },
                    reject: (err: any) => reject(err),
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
