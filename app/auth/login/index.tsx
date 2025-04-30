import {ActivityIndicator, Text, TouchableOpacity, View} from "react-native";


import {Ionicons} from "@expo/vector-icons";
import InputField from "@/components/common/InputField";
import {useAuth} from "@/hooks/useAuth";
import { useState } from "react";
import {loginApi} from "@/services/authService";
import {router} from "expo-router";
import ButtonPrimary from "@/components/common/ButtonPrimary";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogin = async () => {
        setLoading(true);
        setErrorMessage("");
        try {
            const userData = await loginApi(email, password);
            await login(userData);
            router.replace("/");
        } catch (error: any) {
            setErrorMessage(error?.message || "Terjadi kesalahan, coba lagi")
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async () => {
        router.push("/auth/register");
    }



    return (
        <View className="flex-1 bg-white justify-center px-6">
            <View className="items-center mb-8">
                <Ionicons name="person-circle-outline" size={80} color="black"/>
                <Text className="text-3xl font-bold mt-4">Selamat Datang</Text>
                <Text className="text-gray-500 mt-2 text-center">Masuk untuk melanjutkan ke akun anda</Text>
            </View>

            <TouchableOpacity className="bg-gray-100 flex-row items-center justify-center border rounded-md py-3 mb-6">
                <Ionicons name="logo-google" size={20} color="black" className="mr-2"/>
                <Text>Lanjutkan dengan Google</Text>
            </TouchableOpacity>

            <View className="flex-row items-center mb-6">
                <View className="flex-1 h-px bg-gray-300"></View>
                <Text className="mx-4 text-gray-400">atau</Text>
                <View className="flex-1 h-px bg-gray-300"></View>
            </View>

            <InputField
                label="Email"
                placeholder="Masukkan email anda"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <InputField
                label="Password"
                placeholder="Masukkan password anda"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                isPassword
            />

            {errorMessage ? (
                <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}

            <ButtonPrimary
                title="Masuk"
                loading={loading}
                onPress={handleLogin}
            />


            <View className="flex-row justify-center">
                <Text className="text-gray-500">Belum punya akun?</Text>
                <TouchableOpacity onPress={handleRegister}>
                    <Text className="font-semibold"> Daftar</Text>
                </TouchableOpacity>
            </View>




        </View>
    )
}