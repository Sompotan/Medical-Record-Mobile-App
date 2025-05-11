import {useEffect, useState} from "react";
import {RekamMedisItem} from "@/types/rekam-medis/types";
import {getRekamMedis} from "@/services/pasien";
import {ActivityIndicator, FlatList, View} from "react-native";
import RekamMedisCardItem from "@/components/pasien/rekam-medis/RekamMedisCardItem";

export default function RekamMedisCardList() {
    const [data, setData] = useState<RekamMedisItem[]>([])
    const [loading, setLoading] = useState(true)

    const fetchRekamMedis = async () => {
        try {
            const result = await getRekamMedis()
            setData(result)
        } catch (error) {
            console.error("Gagal mengambil data rekam medis:", error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchRekamMedis()
    }, [])

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#2653EB"/>
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <RekamMedisCardItem {...item} />}
            contentContainerStyle={{ paddingTop:16, paddingBottom: 8 }}
        />

    )

}