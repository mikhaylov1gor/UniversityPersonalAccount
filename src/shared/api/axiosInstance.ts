import axios, { AxiosRequestConfig } from 'axios';
import { authController } from './endpoints';
import { RefreshDto } from '@/shared/models/requests/refreshDto.ts';
import { TokenPairDto } from '@/shared/models/responses/tokenPairDto.ts';
import {toast} from "@/app/providers/Toast/ToastController.ts";

const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 20000,
    headers: { 'Content-Type': 'application/json' },
} as AxiosRequestConfig);


let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];


function subscribeTokenRefresh(cb: (token: string) => void) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token: string) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = [];
}

axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/refresh')
        ) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    clearAuthData();
                    return Promise.reject(error);
                }

                return axios
                    .post<TokenPairDto>(`${authController}/refresh`, { refreshToken } as RefreshDto)
                    .then(res => {
                        const { accessToken, refreshToken: newRefresh } = res.data;
                        if (!accessToken || !newRefresh) {
                            clearAuthData();
                            return Promise.reject(new Error('Invalid tokens'));
                        }
                        localStorage.setItem('accessToken', accessToken);
                        localStorage.setItem('refreshToken', newRefresh);
                        isRefreshing = false;
                        onRefreshed(accessToken);

                        if (originalRequest.headers) {
                            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        }
                        return axiosInstance(originalRequest);
                    })
                    .catch(err => {
                        clearAuthData();
                        return Promise.reject(err);
                    });
            }

            return new Promise(resolve => {
                subscribeTokenRefresh((token: string) => {
                    originalRequest.headers['Authorization'] = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                });
            });
        }

        if (error.response) {
            const status = error.response.status;
            const message = error.response.data?.message || 'Произошла ошибка';

            if (status >= 500) {
                toast.error(message || 'Ошибка сервера');
            } else if (status >= 400) {
                toast.warning(message || 'Ошибка запроса');
            }
        } else {
            toast.error("Нет подключения к серверу");
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
