import {View, Text, TouchableOpacity} from "react-native";
import {Check, CheckCircle} from "lucide-react-native";
import {useRouter} from "expo-router";

export default function KunjunganTerdaftarPage() {
    const router = useRouter();
    return (
        <View className="flex-1 items-center justify-center px-8 my-6">
            <Check size="60" color="black"/>
            <Text className="text-[24px] font-bold">Kunjungan berhasil Dibuat</Text>
            <Text className="text-[13px] mb-10">Jangan lupa datang ya</Text>
            <View className="bg-white w-full p-6 border border-gray-300 rounded-lg gap-2">
                <View className="flex flex-row items-center gap-2">
                    <CheckCircle size="30" color="black"/>
                    <Text className="text-[20px] font-bold">Check - In</Text>
                </View>
                <Text className="px-1">
                    Jangan lupa melakukan check in lewat resepsionis jika sudah berada di tempat
                </Text>
            </View>
            <TouchableOpacity
                className="bg-black w-full p-4 rounded-lg mt-4"
                onPress={() => {
                    router.replace("/");
                }}
            >
                <Text className="text-white text-center font-semibold">Kembali ke Halaman Utama</Text>
            </TouchableOpacity>
        </View>
    )
}