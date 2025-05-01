import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import Constants from "expo-constants";

const API = axios.create({
    baseURL: Constants.expoConfig?.extra?.apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const newsAPI = axios.create({
    baseURL: process.env.EXPO_PUBLIC_NEWSDATA_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

API.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})


export default API;