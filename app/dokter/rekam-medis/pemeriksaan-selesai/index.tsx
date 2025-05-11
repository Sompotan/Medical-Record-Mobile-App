import {Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";

export default function PemeriksaanSelesai() {
    const router = useRouter()
    return (
        <View className="flex-1 items-center justify-center ">
            <Text>Pemeriksaan Selesai</Text>
            <TouchableOpacity
                onPress={() => router.push("/")}
                className="flex items-center justify-center w-full "
            >
                <Text className="text-center">Kembali ke Dashboard</Text>
            </TouchableOpacity>
        </View>
    )
}