import {View, Text} from "react-native";
import RekamMedisCard from "@/components/dokter/kunjungan/RekamMedisCard";
import {useEffect, useState} from "react";
import {getRekamMedis} from "@/services/dokterAPI";


export type RekamMedisCardProps = {
    id: string;
    tanggal: string;
    pasien: string;
    kunjunganId: string;
}

export default function RiwayatRekamMedisCard() {
    const [rekamMedisList, setRekamMedisList] = useState<RekamMedisCardProps[]>([])

    useEffect(() => {
        const fetchRekamMedis = async () => {
            try {
                const data = await getRekamMedis()
                setRekamMedisList(data)
            } catch (error) {
                console.error("Gagal mengambil data rekam medis: ", error)
            }
        }

        fetchRekamMedis()
    }, []);

    return (
        <View>
            <Text className="text-[24px] font-semibold mb-3">Riwayat Rekam Medis</Text>
            {rekamMedisList.map((rm) => (
                <RekamMedisCard
                    key={rm.id}
                    id={rm.id}
                    tanggal={rm.tanggal}
                    pasien={rm.pasien}
                />
            ))}
        </View>
    )
}