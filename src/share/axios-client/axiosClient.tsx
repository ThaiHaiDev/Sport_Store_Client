import axios from 'axios';
import process from 'process';
import jwt_decode from 'jwt-decode';
import { getCookie } from 'cookies-next';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getAccessTokenFromLocalStorage = (): any => {
    return localStorage.getItem('access_token') || '{}';
};

const getUserFromLocalStorage = (): any => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:3001/api/v1/refresh', (axios.defaults.withCredentials = true));
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const routerPrivate = async () => {
    await localStorage.clear();
    window.location.href = '/signin';
}

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        token: `Bearer ${getAccessTokenFromLocalStorage()}`,
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    async (config: any) => {
        let date = new Date();
        const tokenRefresh = getCookie('refreshToken');
        const decodedToken: any = jwt_decode(getAccessTokenFromLocalStorage());

        if (tokenRefresh !== undefined) {
            const decodedTokenRefress: any = jwt_decode(String(tokenRefresh));
            if(decodedTokenRefress.exp > date.getTime() / 1000) {  // Check nếu hạn của refreshToken còn lớn hơn time thực thì do refresh
                if (decodedToken.exp < date.getTime() / 1000) {  // Check nếu hạn của accessToken hết hạn là bé hơn time thực thì do refresh
                    const data = await refreshToken();
                    const refreshUser = {
                        user: getUserFromLocalStorage(),
                        accessToken: data.accessToken,
                    };
                    localStorage.setItem('access_token', refreshUser.accessToken)
                    localStorage.setItem('user', JSON.stringify(refreshUser.user))
                    config.headers['token'] = 'Bearer ' + data.accessToken;
                }
                return config;
            } else {
                routerPrivate();
            }
        } else {
            routerPrivate();
        }

    },
    (error) => {
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosClient;
