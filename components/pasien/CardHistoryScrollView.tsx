import {ActivityIndicator, FlatList, ScrollView, View} from "react-native";
import CardHistoryItem, {CardHistoryItemProps} from "@/components/pasien/CardHistoryItem";
import {useEffect, useState} from "react";
import {getRiwayatKunjungan} from "@/services/pasien";

export default function CardHistoryScrollView() {
    const [data, setData] = useState<CardHistoryItemProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKunjungan = async () => {
            try {
                const result = await getRiwayatKunjungan()

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
            }
        }

        fetchKunjungan();
    }, []);

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
                    <CardHistoryItem
                        id={item.id}
                        alasan_kunjungan={item.alasan_kunjungan}
                        nama_dokter={item.nama_dokter}
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
        />
    )

}