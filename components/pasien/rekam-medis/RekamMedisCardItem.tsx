import {RekamMedisItem} from "@/types/rekam-medis/types";
import {useRouter} from "expo-router";
import {Pressable, Text, View} from "react-native";
import {CalendarDays} from "lucide-react-native";

export default function RekamMedisCardItem(item: RekamMedisItem) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.push(`/pasien/rekam-medis/${item.id}`)}
            className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-4"
        >
            <Text className="font-semibold text-base">{item.diagnosis}</Text>
            <Text className="text-sm text-gray-600">{item.dokter}</Text>

            <View className="flex flex-row justify-between mt-4">
                <View className="flex-row items-center gap-2 mt-1">
                    <CalendarDays size={14} color="gray" />
                    <Text className="text-sm text-gray-500">
                        {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>
                </View>
                <Text className="mt-1 text-right text-sm font-medium text-gray-700">Lihat Detail {">"}</Text>
            </View>


        </Pressable>
    )

}