import {ActivityIndicator, FlatList, View} from "react-native";
import CardKunjunganItem, {CardKunjunganItemProps} from "@/components/dokter/kunjungan/CardKunjunganItem";
import {useEffect, useState} from "react";
import {getAntrian} from "@/services/dokterAPI";
import {useRouter} from "expo-router";


export default function CardKunjunganList() {
    const [data, setData] = useState<CardKunjunganItemProps[]>([])
    const [loading, setLoading] = useState(true)

    const router = useRouter()

    useEffect(() => {
        const fetchAntrian = async () => {
            try {
                const result = await getAntrian();
                setData(result)
            } catch (error) {
                console.error("Gagal mengambil antrian kunjungan: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchAntrian()

    }, []);

    if (loading){
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2563EB" />
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <CardKunjunganItem
                    id={item.id}
                    fotoProfil={item.fotoProfil}
                    nama_pasien={item.nama_pasien}
                    alasan_kunjungan={item.alasan_kunjungan}
                    onPress={() => {
                        router.push(`/dokter/kunjungan/${item.id}`)
                    }}
                />
            )}
            contentContainerStyle={{
                paddingTop: 16,
                paddingBottom: 8
            }}
        />
    )
}