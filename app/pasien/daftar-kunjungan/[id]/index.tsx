import {useLocalSearchParams, useRouter} from "expo-router";
import {Alert, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {daftarKunjungan, getJadwalPraktekDokter} from "@/services/pasien";
import DokterInfoCard, {DokterInfoCardProps} from "@/components/pasien/form-daftar-kunjungan/DokterInfoCard";
import CalendarPicker from "@/components/pasien/form-daftar-kunjungan/CalendarPicker";
import ReasonInput from "@/components/pasien/form-daftar-kunjungan/ReasonInput";
import axios from "axios";
import HeadersBackButton from "@/components/pasien/HeadersBackButton";


export type DokterProps = {
    namaLengkap: string;
    fotoProfil?: string;
    jadwalPraktek: string[];
}


export default function FormKunjunganPage() {
    const {id} = useLocalSearchParams()
    const [dokter, setDokter] = useState<DokterProps | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [reason, setReason] = useState("");

    const router = useRouter()

    useEffect(() => {


        const fetchGetJadwalPraktekDokter = async () => {
            try {
                const res = await getJadwalPraktekDokter(id as string);
                setDokter(res)
            } catch (error) {
                console.error("Gagal mengambil data dokter: ", error)
            }
        }

        fetchGetJadwalPraktekDokter()

    }, [id]);

    if (!dokter) return <Text>Loading...</Text>

    const handleSubmit = async () => {
        if (!id || !selectedDate || !reason) return;

        try {
            const res = await daftarKunjungan({
                tenagaMedisId: id as string,
                tanggal_kunjungan: selectedDate,
                alasanKunjungan: reason
            })

            router.push('/pasien/daftar-kunjungan/kunjungan-terdaftar')


        } catch (error) {
            console.error("Gagal mendaftar kunjungan:", error);

            if (axios.isAxiosError(error)) {
                Alert.alert("Gagal", error.response?.data?.error || "Terjadi kesalahan");
            } else {
                Alert.alert("Gagal", "Terjadi kesalahan tak terduga");
            }
        }
    }


    return (
        <View className="my-6">
            <HeadersBackButton title="Daftar Kunjungan"/>
            <ScrollView
                className="px-6"
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            >
                <DokterInfoCard
                    namaLengkap={dokter.namaLengkap}
                    fotoProfil={dokter.fotoProfil}
                />
                <Text className="font-bold text-[20px] mb-4">Pilih Tanggal</Text>
                <CalendarPicker
                    allowedDays={dokter.jadwalPraktek}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />
                <ReasonInput value={reason} onChange={setReason}/>
                <TouchableOpacity
                    className="mt-4 bg-black px-4 py-3 rounded-lg items-center mb-auto disabled:bg-gray-300"
                    disabled={!selectedDate || !reason}
                    onPress={handleSubmit}
                >
                    <Text className="text-white font-semibold">Kirim</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}