import {View, Text} from "react-native";
import RekamMedisCard from "@/components/dokter/kunjungan/RekamMedisCard";
import {useEffect, useState} from "react";
import {getRekamMedisByPatientId} from "@/services/dokterAPI";


export type RekamMedisCardProps = {
    id: string;
    tanggal: string;
    pasien: string;
    dokter: string;
    kunjunganId: string;
}

type RiwayatRekamMedisCardProps = {
    pasienId?: string;
};

export default function RiwayatRekamMedisCard({pasienId}: RiwayatRekamMedisCardProps) {
    const [rekamMedisList, setRekamMedisList] = useState<RekamMedisCardProps[]>([])

    useEffect(() => {
        if (!pasienId) return;

        const fetchRekamMedis = async () => {
            try {
                const data = await getRekamMedisByPatientId(pasienId);
                setRekamMedisList(data);
                console.log(data)
            } catch (error) {
                console.error("Gagal mengambil data rekam medis: ", error);
            }
        };

        fetchRekamMedis();
    }, [pasienId]);

    return (
        <View>
            <Text className="text-[24px] font-semibold mb-3">Riwayat Rekam Medis</Text>
            {/*{rekamMedisList.map((rm) => (*/}
            {/*    // <RekamMedisCard*/}
            {/*    //     key={rm.id}*/}
            {/*    //     id={rm.id}*/}
            {/*    //     tanggal={rm.tanggal}*/}
            {/*    //     pasien={rm.pasien}*/}
            {/*    //     dokter={rm.dokter}*/}
            {/*    // />*/}
            {/*))}*/}
        </View>
    )
}