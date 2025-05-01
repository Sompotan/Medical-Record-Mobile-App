import { View, Text, Alert } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useState } from "react";
import { logoutApi } from "@/services/authService";
import ButtonPrimary from "../../components/common/ButtonPrimary";

export default function Beranda() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logoutApi(); // 🔥 Kirim request logout ke server
        } catch (error) {
            console.error("[Logout API Error]", error);
            Alert.alert("Logout Server Gagal", "Keluar dari aplikasi berhasil, tetapi gagal memberi tahu server.");
        } finally {
            await logout(); // 🔥 Clear SecureStore + context
            router.replace("/"); // 🔥 Redirect ke login page
            setLoading(false); // 🔥 Penting supaya tombol aktif lagi
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            <Text className="text-2xl font-bold mb-6">Beranda</Text>

            <ButtonPrimary
                title="Keluar"
                onPress={handleLogout}
                loading={loading}
            />
        </View>
    );
}
