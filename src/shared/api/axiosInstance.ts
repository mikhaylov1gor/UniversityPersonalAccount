import axios, { AxiosRequestConfig } from 'axios';
import { authController } from './endpoints';
import { RefreshDto } from '@/shared/models/requests/refreshDto.ts';
import { TokenPairDto } from '@/shared/models/responses/tokenPairDto.ts';

const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
} as AxiosRequestConfig);

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/refresh')
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    clearAuthData();
                    throw new Error('No refresh token');
                }

                const refreshDto: RefreshDto = {
                    refreshToken: refreshToken
                };

                const refreshResponse = await axios.post<TokenPairDto>(
                    `${authController}/refresh`,
                    refreshDto
                );

                const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;

                if (!newAccessToken || !newRefreshToken) {
                    clearAuthData();
                    return Promise.reject(new Error('Invalid token pair'));
                }

                localStorage.setItem('accessToken', newAccessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                if (originalRequest.headers) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                }

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                clearAuthData();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

function clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}

export default axiosInstance;
