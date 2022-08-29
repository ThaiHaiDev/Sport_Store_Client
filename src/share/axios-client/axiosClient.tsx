import axios from 'axios';
import process from 'process';
import jwt_decode from 'jwt-decode';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const getUserFromLocalStorage = (): any => {
    return localStorage.getItem('access_token') || '{}';
};

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:3001/api/v1/refresh', (axios.defaults.withCredentials = true));
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
        token: `Bearer ${getUserFromLocalStorage()}`,
    },
});

// Add a request interceptor
// axiosClient.interceptors.request.use(
//     async (config: any) => {
//         let date = new Date();
//         const decodedToken: any = jwt_decode(getUserFromLocalStorage());
//         if (decodedToken.exp < date.getTime() / 1000) {
//             const data = await refreshToken();
//             const refreshUser = {
//                 ...getUserFromLocalStorage(),
//                 accessToken: data.accessToken,
//             };
//             //   dispath(stateSuccess(refreshUser)); // Dispath lại login hoặc logout
//             config.headers['token'] = 'Bearer ' + data.accessToken;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

axiosClient.interceptors.request.use(
  (config) => {
      return config;
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
