import axios from 'axios';
import { useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_BASE_URL;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    response => response,

    async error => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    `${API_URL}/admin/refresh-token`,
                    {
                        refreshToken: localStorage.getItem('refreshToken'),
                    },
                );

                console.log('new access token: ', data.data.accessToken);

                localStorage.setItem('accessToken', data.data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

                return apiClient(originalRequest);
            } catch (error) {
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    },
);

export const signIn = async (email: string, password: string) => {
    const response = await apiClient.post('/admin/sign-in', {
        email,
        password,
    });

    localStorage.setItem('accessToken', response.data.data.accessToken);
    localStorage.setItem('refreshToken', response.data.data.refreshToken);

    if (response.data.data.data.role === 'admin') {
        localStorage.setItem('isAdminLoggedIn', 'true');
    }

    return response.data;
};

export const useAuth = () => {
    const refreshToken = async () => {
        try {
            const { data } = await axios.post(
                `${API_URL}/admin/refresh-token`,
                {
                    refreshToken: localStorage.getItem('refreshToken'),
                },
            );

            localStorage.setItem('accessToken', data.accessToken);
        } catch (error) {
            console.log('Unable to refresh token', error);
        }
    };

    useEffect(() => {
        refreshToken();

        const interval = setInterval(() => {
            refreshToken();
        }, 4 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
};

// Just for example of protected route that requires access token
export const fetchProtectedData = async () => {
    const response = await apiClient.get('/ednpointname', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return response.data;
};
