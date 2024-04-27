import axios from 'axios';
import router from '../router';

// 請求攔截器，在每次請求發送之前加上token
axios.interceptors.request.use((config: any) => {
    if (localStorage.token) {
        config.headers.Authorization = localStorage.token
    }

    return config;
}, (error: any) => {
    return Promise.reject(error)
})

// 響應攔截器，檢查登錄狀態
axios.interceptors.response.use(response => {
    return response;
}, (error: any) => {
    const {status} = error.response

    // 如果狀態碼為401，即未授權
    if (status === 401) {
        localStorage.removeItem("token")
        router.push("/login")
    }
    // 如果響應錯誤，回傳錯誤
    return Promise.reject(error)
})

const httpClient = axios.create({});

export default httpClient;
