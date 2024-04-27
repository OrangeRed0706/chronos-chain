import axios from 'axios';
import router from '../router';
import {ref} from 'vue';

const loading = ref(false);

// 請求攔截器，在每次請求發送之前加上token
axios.interceptors.request.use((config: any) => {
    loading.value = true; // 在請求發送前將 loading 設為 true

    if (localStorage.token) {
        config.headers.Authorization = localStorage.token;
    }

    return config;
}, (error: any) => {
    loading.value = false; // 如果請求發生錯誤，將 loading 設為 false
    return Promise.reject(error);
});

// 響應攔截器，檢查登錄狀態
axios.interceptors.response.use(response => {
    loading.value = false; // 在響應成功後將 loading 設為 false
    return response;
}, (error: any) => {
    loading.value = false; // 如果響應發生錯誤，將 loading 設為 false

    const {status} = error.response;

    // 如果狀態碼為401，即未授權
    if (status === 401) {
        localStorage.removeItem("token");
        router.push("/login");
    }
    // 如果響應錯誤，回傳錯誤
    return Promise.reject(error);
});

export {axios, loading};
