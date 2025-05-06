import {View} from "react-native";
import CardKunjunganList from "@/components/dokter/kunjungan/CardKunjunganList";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";

export default function KunjunganPage() {
    return (
        <View className="my-4">
            <HeadersBackButton title="Kunjungan"/>
            <View className="px-4">
                <CardKunjunganList />
            </View>

        </View>
    )
}