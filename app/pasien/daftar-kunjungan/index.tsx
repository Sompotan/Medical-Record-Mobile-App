import { Left } from "@/app/icons";
import { View, Text, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";
import ListDokter from "@/components/pasien/ListDokter";



export const options = {
    headerShown: false,
}

export default function PageDaftarKunjungan() {

    const router = useRouter();

    return (
        <View className="my-6 flex-1">
            <HeadersBackButton title="Pilih Dokter" />
            <View className="p-4">
                <ListDokter />
            </View>

        </View >
    )
}