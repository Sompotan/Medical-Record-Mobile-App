import {useState} from "react";
import {router} from "expo-router";
import {View, Text, TouchableOpacity, Alert} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import InputField from "@/components/common/InputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {useAuth} from "@/hooks/useAuth";
import { registerApi } from "@/services/authService";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const { login } = useAuth();

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert("Error", "Semua field wajib diisi")
            return;
        }

        if (!agreeTerms) {
            alert("Anda harus menyetujui persyaratan dan ketentuan.")
            return;
        }

        if (password !== confirmPassword) {
            alert("Password dan konfirmasi password tidak sama.")
            return;
        }

        setLoading(true);

        try {
            const userData = await registerApi({
                email: email,
                password: password
            })

            await login(userData);
            router.replace("/auth/after-register");
        } catch (error: any) {
            Alert.alert("Error", error.message)
        } finally {
            setLoading(false);
        }
    }

    const goToLogin = () => {
        router.push('/auth/login');
    }

    return (
        <View className="flex-1 bg-white justify-center px-6">
            <View className="items-center mb-8">
                <Ionicons name="person-circle-outline" size={80} color="black"/>
                <Text className="text-3xl font-bold mt-4">Buat Akun</Text>
                <Text className="text-gray-500 mt-2 text-center">Lanjutkan dengan Google</Text>
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

            <InputField
                label="Konfirmasi Password"
                placeholder="Konfirmasi password anda"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                isPassword
            />

            <TouchableOpacity
                className="flex-row items-center mb-6"
                onPress={() => setAgreeTerms(!agreeTerms)}
                activeOpacity={0.8}
            >
                <View className="h-5 w-5 border rounded justify-center items-center mr-2">
                    {agreeTerms && <Ionicons name="checkmark" size={16} color="black"/>}
                </View>
                <Text className="text-gray-600 text-sm">
                    Saya setuju dengan <Text className="font-semibold">Persyaratan & Ketentuan</Text> yang berlaku
                </Text>
            </TouchableOpacity>

            {errorMessage ? (
                <Text className="text-red-500 text-center mb-4">{errorMessage}</Text>
            ) : null}

            <ButtonPrimary
                title="Daftar"
                loading={loading}
                onPress={handleRegister}
            />

            <View className="flex-row justify-center">
                <Text className="text-gray-500">Sudah punya akun?</Text>
                <TouchableOpacity onPress={goToLogin}>
                    <Text className="font-semibold"> Masuk</Text>
                </TouchableOpacity>
            </View>



        </View>
    )

}