import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Instance Axios khusus Publik (Tanpa perlu Header Authorization)
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    timeout:8000,
});


export const publicPackageService = {
    getPackages: async (type = null) => {
        const params = type ? {type}:{};
        const res = await apiClient.get('/packages',{params});

        return res.data.data;
    },
    getBySlug: async(slug) => {
        const res = await apiClient.get(`/packages/${slug}`);
        return res.data.data;
    }
};

export const publicBannerService = {
    getHeroSlides: async () => {
        const res = await apiClient.get('/banners');
        return res.data.data;
    },
};

export const  publicCoverageService = {
    getAreas: async () => {
        const res = await apiClient.get('/coverage/areas');
        return res.data.data;
    },

    checkAvailability: async ({city, district, address}) => {
        const res = await apiClient.post('/coverage/check', {city, district, address});
        return res.data;
    },

    submitInquiry: async (inquiryData) => {
        const res = await apiClient.post('/coverage/inquiry', inquiryData);
        return res.data;
    },
};

export const publicOrderService = {
    createOrder: async (orderData) => {
        const res = await apiClient.post('/orders', orderData);
        return res.data;
    },
};

export const publicSettingService = {
    getSettings: async () => {
        const res = await apiClient.get('/site-config');
        return res.data.data;
    },
};

export const publicSeoService = {
    getGlobalSeo: async () => {
        const res = await apiClient.get('/seo/global');
        return res.data.data;
    },

    getPageSeo: async (pageKey) => {
        const res = await apiClient.get(`/seo/${pageKey}`);
        return res.data.data
    },
};

export default apiClient;


