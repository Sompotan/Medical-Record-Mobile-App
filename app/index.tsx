import { View, ActivityIndicator } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import { getStatusVerifikasi } from "@/services/pasien"; // pastikan ini ada

export default function index() {
    const { user, loading, updateUser } = useAuth();

    useEffect(() => {
        const syncVerifikasiStatus = async () => {
            if (user?.role === "pasien" && user.isVerified !== "verified") {
                try {
                    const res = await getStatusVerifikasi(); // ambil status dari backend
                    if (res.status === "verified") {
                        await updateUser({ isVerified: "verified" }); // update context dan SecureStore
                    }
                } catch (error) {
                    console.error("[Verifikasi Sync Error]", error);
                }
            }
        };

        syncVerifikasiStatus();
    }, [user]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!user) {
        return <Redirect href="/auth/login" />;
    }

    if (user.role === "dokter") {
        return <Redirect href="/dokter" />;
    }

    if (user.role === "pasien") {
        if (!user.isVerified || user.isVerified === "belum") {
            return <Redirect href="/auth/after-register" />;
        }

        if (user.isVerified === "menunggu") {
            return <Redirect href="/verifikasi-status/selesai" />;
        }

        if (user.isVerified === "verified") {
            return <Redirect href="/pasien" />;
        }
    }

    return <Redirect href="/auth/login" />;
}