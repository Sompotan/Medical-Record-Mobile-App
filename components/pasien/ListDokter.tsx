import {ActivityIndicator, FlatList, View} from "react-native";
import ListItemDokter, {ListItemDokterProps} from "@/components/pasien/ListItemDokter";
import {useEffect, useState} from "react";
import {getDokterList} from "@/services/pasien";

export default function ListDokter() {
    const [data, setData] = useState<ListItemDokterProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchListDokter = async () => {
            try {
                const dokter = await getDokterList()
                const mapped = dokter.map((dokter: any) => ({
                    id: dokter.id,
                    namaLengkap: dokter.nama?.namaLengkap ?? "-",
                    foto_profil: dokter.foto_profil,
                    path: `/form-kunjungan/${dokter.id}`,
                }));
                setData(mapped)

            } catch (error) {
                console.error("Gagal Mengambil data dokter: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchListDokter();

    }, []);

    if(loading) {
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
            renderItem={({item}) => {
                console.log(data)
                return(
                    <ListItemDokter
                        id={item.id}
                        namaLengkap={item.namaLengkap}
                        foto_profil={item.foto_profil}
                        path={`/form-kunjungan/${item.id}`}
                    />
                )
            }}

        />
    )
}