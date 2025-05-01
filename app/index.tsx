import { View, ActivityIndicator } from "react-native"

import {useAuth} from "@/hooks/useAuth";
import {Redirect} from "expo-router";

import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function index() {
    const {user, loading} = useAuth();


    useEffect(() => {
        const checkSecureStore = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync("user");
            } catch (error) {
                console.error("[SecureStore Error]", error);
            }
        };

        checkSecureStore();
    }, [user]);




    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        )
    }

    if (!user) {
        return <Redirect href="/auth/login" />;
    }

    if (user.role === "dokter") {
        return <Redirect href="/dokter"/>
    }

    if (user.role === "pasien") {
        if (!user.isVerified || user.isVerified === "belum"){
            return <Redirect href="/auth/after-register"/>
        }

        if (user.isVerified === "menunggu") {
            return <Redirect href="/verifikasi-status/selesai"/>
        }

        if (user.isVerified === "verified") {
            return <Redirect href="/pasien"/>
        }
    }

    return <Redirect href="/auth/login"/>

}