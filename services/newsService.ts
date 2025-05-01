import {newsAPI} from "@/services/api";
import Constants from "expo-constants";

export const getHealthNews = async() => {
    const res = await newsAPI.get('/latest', {
        params: {
            apiKey: process.env.EXPO_PUBLIC_NEWSDATA_API_KEY,
            category: 'health',
            country: 'id',
            language: 'id',
        },
    });

    return res.data.results
}