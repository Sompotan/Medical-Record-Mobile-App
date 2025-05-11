import {useLocalSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import {getRekamMedisById} from "@/services/pasien";
import {ActivityIndicator, ScrollView, View, Text} from "react-native";
import DetailRekamMedisCard from "@/components/pasien/rekam-medis/DetailRekamMedisCard";
import {DetailRekamMedis} from "@/types/pasien/types";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";

export default function DetailRekamMedisPage() {
    const {id} = useLocalSearchParams()
    const [data, setData] = useState<DetailRekamMedis | null>(null);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const result = await getRekamMedisById(id as string)
            setData(result.utama)
        } catch (error) {
            console.error("Gagal mengambil detail rekam medis:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        );
    }

    if (!data) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Data tidak ditemukan</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 p-4">
            <HeadersBackButton title="Detail Rekam Medis" />
            <ScrollView
                className="p-4"
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flexGrow:1
                }}
            >
                <DetailRekamMedisCard data={data} />
            </ScrollView>
        </View>

    )

}