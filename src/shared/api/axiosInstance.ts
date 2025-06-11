import axios, { AxiosRequestConfig } from 'axios';
import { authController } from './endpoints';
import {RefreshDto} from "@/shared/models/requests/refreshDto.ts";
import {TokenPairDto} from "@/shared/models/responses/tokenPairDto.ts";

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
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || originalRequest._retry) {
            return Promise.reject(error);
        }

        if (originalRequest.url?.includes('/Refresh')) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refreshToken');

        if (!refreshToken) {
            clearAuthData();
            return Promise.reject(error);
        }

        try {
            const refreshDto: RefreshDto = {
                refreshToken: refreshToken
            };

            const { data }: TokenPairDto = await axios.post<TokenPairDto>(`${authController}/Refresh`, refreshDto, {
            } as AxiosRequestConfig);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return axiosInstance(originalRequest);

        } catch (refreshError) {
            clearAuthData();
            return Promise.reject(refreshError);
        }
    }
);

function clearAuthData() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
}

export default axiosInstance;