import {ActivityIndicator, FlatList, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import DokterCardHistoryItem, {DokterCardHistoryItemProps} from "@/components/dokter/riwayat/CardHistoryItem";
import {getRiwayatKunjunganDokter} from "@/services/dokterAPI";



export default function CardHistoryScrollView() {
    const [data, setData] = useState<DokterCardHistoryItemProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchKunjungan = async () => {
        try {
            const result = await getRiwayatKunjunganDokter()

            const sorted = result.sort((a: { status: string; tanggal_kunjungan: string | number | Date; }, b: { status: string; tanggal_kunjungan: string | number | Date; }) => {
                if (a.status !== "SELESAI" && b.status === "SELESAI") return -1;
                if (a.status === "SELESAI" && b.status !== "SELESAI") return 1;
                return new Date(b.tanggal_kunjungan).getTime() - new Date(a.tanggal_kunjungan).getTime();
            });

            setData(sorted)
        } catch (error) {
            console.error("Gagal mengambil data kunjungan: ", error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    useEffect(() => {
        fetchKunjungan();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchKunjungan()
    }, [])

    if(loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        )
    }

    return(
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => {
                return(
                    <DokterCardHistoryItem
                        id={item.id}
                        alasan_kunjungan={item.alasan_kunjungan}
                        nama_pasien={item.nama_pasien}
                        status={item.status}
                        tanggal_kunjungan={new Date(item.tanggal_kunjungan).toLocaleDateString("id-ID", {
                            day: "numeric", month: "long", year: "numeric"
                        })}
                    />
                )}}
            contentContainerStyle={{
                paddingTop: 16,
                paddingBottom: 8
            }}
            refreshing={refreshing}
            onRefresh={onRefresh}
        />
    )

}