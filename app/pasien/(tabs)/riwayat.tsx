import {View, Text} from "react-native";
import CardHistoryItem from "@/components/pasien/CardHistoryItem";
import CardHistoryScrollView from "@/components/pasien/CardHistoryScrollView";

export default function RiwayatPage() {
    return (
        <View className="flex-1">
            <View className="bg-white w-full px-8 py-4">
                <Text className="text-[25px] font-semibold ">Halaman Riwayat</Text>
            </View>
            <CardHistoryScrollView />


        </View>
    )
}