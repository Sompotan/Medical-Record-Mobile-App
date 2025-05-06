import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {User} from "lucide-react-native";
import KunjunganPasienProfile, {
    KunjunganPasienProfileProps
} from "@/components/dokter/kunjungan/KunjunganPasienProfile";
import {useEffect, useState} from "react";
import {getAntrianById} from "@/services/dokterAPI";
import {useLocalSearchParams} from "expo-router";
import RiwayatRekamMedisCard from "@/components/dokter/kunjungan/RiwayatRekamMedisCard";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";



export default function DetailKunjunganPasien() {
    const {id} = useLocalSearchParams()
    const [pasien, setPasienData] = useState<KunjunganPasienProfileProps | undefined>(undefined)

    useEffect(() => {
        const fetchDataAntrian = async () => {
            try {
                const data = await getAntrianById(id as string);
                setPasienData(data);
            } catch (error) {
                console.error("Gagal mengambil data antrian: ", error);
            }
        }

        fetchDataAntrian()
    }, [id]);

    return (
        <View className="flex-1 relative">
            <View className="mt-4">
                <HeadersBackButton title="Detail Kunjungan" />
            </View>
            <ScrollView >
                <View className="gap-5 px-4 my-4">
                    <KunjunganPasienProfile
                        nama_pasien={pasien?.nama_pasien}
                        medicalRecordNumber={pasien?.medicalRecordNumber}
                        tanggal_lahir={
                            pasien?.tanggal_lahir
                                ? new Date(pasien.tanggal_lahir).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })
                                : "-"
                        }
                        gender={pasien?.gender}
                        alasan_kunjungan={pasien?.alasan_kunjungan}
                    />
                    <RiwayatRekamMedisCard />
                </View>
            </ScrollView>

            <View className="absolute bottom-4 left-4 right-4">
                <TouchableOpacity className="bg-black py-4 rounded-lg">
                    <Text className="text-white text-center font-semibold">Mulai Kunjungan</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}