import {ActivityIndicator, ScrollView, View} from "react-native";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";
import {useEffect, useState} from "react";
import {PasienDitangani} from "@/types/dokter/types";
import {useRouter} from "expo-router";
import {getPasienDitangani} from "@/services/dokterAPI";
import PasienDitanganiCard from "@/components/dokter/pasien/PasienDitanganiCard";

export default function PasienPage() {
    const [data, setData] = useState<PasienDitangani[]>([])
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const fetchData = async () => {
        try {
            const result = await getPasienDitangani()
            setData(result)
        } catch (error) {
            console.error("Gagal mengambil data pasien: ", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }


    return (
        <ScrollView
            className="flex-1 p-4"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1
            }}
        >
            <HeadersBackButton title="Daftar Pasien"/>
            <View className="p-4">
                {data.map((item) => (
                    <PasienDitanganiCard
                        key={item.id}
                        nama={item.nama}
                        fotoProfil={item.fotoProfil}
                        mrn={item.mrn}
                        onPress={() => router.push(`/dokter/pasien/${item.id}`)}
                        id={item.id}
                    />
                ))}
            </View>
        </ScrollView>
    )
}