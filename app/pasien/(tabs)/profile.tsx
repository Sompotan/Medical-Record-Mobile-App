import {View, Text, Alert} from "react-native";
import {useAuth} from "@/hooks/useAuth";
import {useState} from "react";
import {logoutApi} from "@/services/authService";
import {router} from "expo-router";
import ButtonPrimary from "@/components/common/ButtonPrimary";

export default function ProfilePage() {
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
        <View>

        </View>
    );
}