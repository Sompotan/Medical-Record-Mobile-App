import {View} from "react-native";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";
import RekamMedisCardList from "@/components/pasien/rekam-medis/RekamMedisCardList";

export default function RekamMedisPage() {
    return (
        <View className="flex-1 p-4">
            <HeadersBackButton title="Rekam Medis"/>
            <View className="px-4">
                <RekamMedisCardList />
            </View>
        </View>
    )
}