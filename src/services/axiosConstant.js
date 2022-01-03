import axios from 'axios';
import MemoryStorage from './memoryStorage';

const memoryStorageService = MemoryStorage.getService();

const axiosConstant = axios.create({withCredentials: true});

axiosConstant.interceptors.request.use(
    config => {
        const token = memoryStorageService.ccAccessToken();
        if (token){
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        console.log(config);
        return config;
    },
    error => {
        console.log(error);
        Promise.reject(error);
    });

axiosConstant.interceptors.response.use((response) => {
    return response
}, function(error){
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        const refreshToken = memoryStorageService.ccRefreshToken();

        return axiosConstant.post(process.env.REACT_APP_API+'cc/refreshToken',
            {
                "refreshToken": refreshToken
            }).then(res => {
                if (res.status === 201) {
                    memoryStorageService.ccSetAccessToken(res.data.access_token);
                    axiosConstant.defaults.headers.common['Authorization'] = 'Bearer ' + memoryStorageService.ccAccessToken();
                    return axiosConstant(originalRequest)
                }
            })
    }
    return Promise.reject(error);
});

export default axiosConstant;
