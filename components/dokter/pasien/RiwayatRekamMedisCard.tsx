import {RiwayatRekamMedisCardProps} from "@/types/dokter/types";
import {Text, TouchableOpacity, View} from "react-native";
import {CalendarDays} from "lucide-react-native";

export default function RiwayatRekamMedisCard({id, diagnosis, dokter, tanggal, onPress} : RiwayatRekamMedisCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="bg-white p-4 border rounded-md mb-3"
        >
            <Text className="font-semibold">{diagnosis}</Text>
            <Text className="text-sm text-gray-500 mt-1">{dokter}</Text>
            <View className="flex-row items-center mt-2 justify-between">
                <View className="flex flex-row items-center gap-2">
                    <CalendarDays size={14} color="#9ca3af" />
                    <Text className="text-sm">{tanggal}</Text>
                </View>
                <Text className="text-right text-sm text-blue-600 font-semibold mt-2">Lihat Detail &gt;</Text>
            </View>

        </TouchableOpacity>
    )
}