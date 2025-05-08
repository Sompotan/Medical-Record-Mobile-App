import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {User} from "lucide-react-native";
import KunjunganPasienProfile, {
    KunjunganPasienProfileProps
} from "@/components/dokter/kunjungan/KunjunganPasienProfile";
import {useEffect, useState} from "react";
import {getAntrianById, mulaiPemeriksaan} from "@/services/dokterAPI";
import {useLocalSearchParams, useRouter} from "expo-router";
import RiwayatRekamMedisCard from "@/components/dokter/kunjungan/RiwayatRekamMedisCard";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";



export default function DetailKunjunganPasien() {
    const {id} = useLocalSearchParams()
    const [pasien, setPasienData] = useState<KunjunganPasienProfileProps | undefined>(undefined)
    const [pasienId, setPasienId] = useState<string | null>(null);
    const [draftRekamMedisId, setDraftRekamMedisId] = useState<string | null>(null);

    const router = useRouter()


    useEffect(() => {
        const fetchDataAntrian = async () => {
            try {
                const data = await getAntrianById(id as string);
                setPasienData(data);
                setPasienId(data?.pasienId);
                console.log("Data pasien: ", data);
            } catch (error) {
                console.error("Gagal mengambil data antrian: ", error);
            }
        }

        const checkExistingDraft = async () => {
            try {
                if (!id) return ;
                const response = await mulaiPemeriksaan(id as string)
                const rekamMedisId = response?.data?.id

                if (rekamMedisId) setDraftRekamMedisId(rekamMedisId)

            } catch (error) {
                console.error("Gagal cek rekam medis draft: ", error)
            }
        }

        fetchDataAntrian()
        checkExistingDraft()
    }, [id]);

    const handleSubmit = async () => {
        try {
            if (!id) return;
            const response = await mulaiPemeriksaan(id as string)

            const rekamMedisId = response?.data?.id
            if (!rekamMedisId) throw new Error("Rekam medis ID tidak ditemukan");

            // @ts-ignore
            router.push(`/dokter/rekam-medis/${rekamMedisId}`)
        } catch (error) {
            console.error("Gagal memulai pemeriksaan: ", error)
        }
    }


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
                    {pasienId && <RiwayatRekamMedisCard pasienId={pasienId} />}
                </View>
            </ScrollView>

            <View className="absolute bottom-4 left-4 right-4">
                <View>
                    <TouchableOpacity className="bg-black py-4 rounded-lg" onPress={handleSubmit}>
                        <Text className="text-white text-center font-semibold">Mulai Pemeriksaan</Text>
                    </TouchableOpacity>

                    {draftRekamMedisId && (
                        <TouchableOpacity
                            className="bg-gray-700 py-4 rounded-lg mt-2"
                            onPress={() =>
                                // @ts-ignore
                                router.push(`/dokter/rekam-medis/${draftRekamMedisId}`)
                            }
                        >
                            <Text className="text-white text-center font-semibold">Buka Draft Sebelumnya</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </View>

        </View>


    )
}