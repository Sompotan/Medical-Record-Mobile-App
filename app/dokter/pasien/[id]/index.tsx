import {ActivityIndicator, View, Text, ScrollView} from "react-native";
import {useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import {DetailPasienWithRiwayat} from "@/types/dokter/types";
import {getDetailPasienDitangani} from "@/services/dokterAPI";
import PasienProfilCard from "@/components/dokter/pasien/PasienProfilCard";
import RiwayatRekamMedisCard from "@/components/dokter/pasien/RiwayatRekamMedisCard";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";

export default function DetailPasienPage(){
    const { id } = useLocalSearchParams()
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState<DetailPasienWithRiwayat | null>(null)

    const router = useRouter()

    const fetchData = async () => {
        try {
            const result = await getDetailPasienDitangani(id as string)
            setData(result)
        } catch (error) {
            console.error("Gagal mengambil data pasien:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [id]);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        )
    }

    if (!data) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">Data pasien tidak ditemukan</Text>
            </View>
        );
    }


    return (
        <ScrollView
            className="flex-1 px-4 py-6"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
                flexGrow: 1,
            }}
        >
            <HeadersBackButton title="Detail Pasien"/>
            <PasienProfilCard
                namaLengkap={data.pasien.namaLengkap}
                medicalRecordNumber={data.pasien.medicalRecordNumber}
                tanggalLahir={new Date(data.pasien.tanggalLahir).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
                gender={data.pasien.gender}
                fotoProfil={data.pasien.fotoProfil}
            />

            <View className="p-4 bg-white mt-4 rounded-xl shadow-md shadow-gray-800 " >
                <Text className="text-2xl font-semibold pb-4">Riwayat Rekam Medis</Text>
                {data.rekamMedis.map((item, index) => (
                    <RiwayatRekamMedisCard
                        key={item.id}
                        id={item.id}
                        diagnosis={item.diagnosis}
                        dokter={item.dokter}
                        tanggal={new Date(item.tanggal).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                        onPress={() => router.push(`/dokter/rekam-medis/${item.id}?readonly=true`)}
                    />
                ))}
            </View>
        </ScrollView>
    )
}