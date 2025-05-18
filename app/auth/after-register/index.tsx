import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { logoutApi } from "@/services/authService";
import { router } from "expo-router";

export default function AfterRegister() {
    const handleMulaiVerifikasi = () => {
        router.push("/verifikasi/step1")
    }

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
        <View className="flex-1 bg-white px-6 justify-center">
            <View className="items-center mb-6">
                <Ionicons name="checkmark-circle-outline" size={100} color="black" />
                <Text className="text-2xl font-bold text-center mt-4">Pendaftaran Berhasil</Text>
                <Text className="text-gray-600 text-center mt-2">Selesaikan verifikasi identitas untuk melanjutkan</Text>
            </View>

            <View className="bg-gray-100 p-4 rounded-md mb-8">
                <View className="flex-row items-center mb-4">
                    <Ionicons name="checkmark-circle" size={24} color="black" />
                    <Text className="text-lg font-bold ml-2">Verifikasi Identitas Anda</Text>
                </View>
                <Text className="text-gray-600 mb-6">
                    Lengkapi identitas diri Anda agar dapat terhubung dengan aplikasi
                </Text>

                <View className="flex-row justify-between">
                    <View className="flex-1 items-center">
                        <Ionicons name="card" size={36} color="black" />
                        <Text className="mt-2 text-sm">ID Card</Text>
                    </View>

                    <View className="flex-1 items-center">
                        <MaterialIcons name="account-balance-wallet" size={36} color="black" />
                        <Text className="mt-2 text-sm">Pembiayaan</Text>
                    </View>

                    <View className="flex-1 items-center">
                        <Entypo name="location-pin" size={36} color="black" />
                        <Text className="mt-2 text-sm">Alamat</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                onPress={handleMulaiVerifikasi}
                className="bg-black py-4 rounded-md items-center mb-6"
                activeOpacity={0.8}
            >
                <Text className="text-white font-semibold">Mulai Verifikasi</Text>
            </TouchableOpacity>

        </View>
    )
}