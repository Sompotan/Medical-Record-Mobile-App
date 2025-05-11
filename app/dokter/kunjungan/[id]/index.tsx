import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";
import KunjunganPasienProfile, { KunjunganPasienProfileProps } from "@/components/dokter/kunjungan/KunjunganPasienProfile";
import RiwayatRekamMedisCard from "@/components/dokter/kunjungan/RiwayatRekamMedisCard";
import { useEffect, useState } from "react";
import { getAntrianById, mulaiPemeriksaan } from "@/services/dokterAPI";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetailKunjunganPasien() {
    const { id } = useLocalSearchParams();
    const [pasien, setPasienData] = useState<KunjunganPasienProfileProps | undefined>(undefined);
    const [pasienId, setPasienId] = useState<string | null>(null);
    const router = useRouter();

    // 🔍 Ambil data pasien dari antrian
    useEffect(() => {
        const fetchDataAntrian = async () => {
            try {
                const data = await getAntrianById(id as string);
                setPasienData(data);
                setPasienId(data?.pasienId);
            } catch (error) {
                console.error("Gagal mengambil data antrian: ", error);
            }
        };

        fetchDataAntrian();
    }, [id]);

    // ▶️ Dipanggil hanya ketika tombol ditekan
    const handleMulaiPemeriksaan = async () => {
        try {
            if (!id) return;
            const response = await mulaiPemeriksaan(id as string);
            const rekamMedisId = response?.data?.id;
            if (!rekamMedisId) throw new Error("Rekam medis ID tidak ditemukan");

            router.push(`/dokter/rekam-medis/${rekamMedisId}?kunjunganId=${id}`);
        } catch (error) {
            console.error("Gagal memulai pemeriksaan: ", error);
        }
    };

    return (
        <View className="flex-1 relative">
            <View className="mt-4">
                <HeadersBackButton title="Detail Kunjungan" />
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    paddingBottom: 100,
                    flexGrow: 1,
                }}
            >
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

            {/* Tombol Mulai atau Lanjutkan Pemeriksaan */}
            <View className="absolute bottom-4 left-4 right-4">
                {pasien?.status === "DalamPemeriksaan" ? (
                    <TouchableOpacity
                        className="bg-gray-700 py-4 rounded-lg mt-2"
                        onPress={handleMulaiPemeriksaan}
                    >
                        <Text className="text-white text-center font-semibold">Buka Draft Sebelumnya</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity className="bg-black py-4 rounded-lg" onPress={handleMulaiPemeriksaan}>
                        <Text className="text-white text-center font-semibold">Mulai Pemeriksaan</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
