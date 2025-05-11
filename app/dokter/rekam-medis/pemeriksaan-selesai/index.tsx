import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle } from "lucide-react-native";
import * as Animatable from "react-native-animatable";

export default function PemeriksaanSelesai() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white px-6 justify-between pb-10">
            {/* Bagian tengah (icon + text) */}
            <View className="flex-1 justify-center items-center">
                <Animatable.View animation="fadeInUp" duration={800} className="items-center">
                    <CheckCircle size={72} strokeWidth={1.5} color="black" />
                    <Text className="text-xl font-bold mt-4 text-center">
                        Pemeriksaan Berhasil Diakhiri
                    </Text>
                </Animatable.View>
            </View>

            {/* Tombol di bagian bawah */}
            <TouchableOpacity
                onPress={() => router.replace("/")}
                className="w-full py-4 bg-black rounded-xl"
            >
                <Text className="text-white text-center font-semibold">Kembali ke Dashboard</Text>
            </TouchableOpacity>
        </View>
    );
}
