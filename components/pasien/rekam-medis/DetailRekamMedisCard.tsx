import {DetailRekamMedis} from "@/types/pasien/types";
import { View, Text } from "react-native";

type DetailRekamMedisCardProps = {
    data: DetailRekamMedis
}

export default function DetailRekamMedisCard({data}: DetailRekamMedisCardProps) {
    const keluhan = data.keluhan ?? "-";
    const tekanan = data.tekananDarah ?? "-";
    const detak = data.detakJantung ?? "-";
    const diagnosis = data.diagnosis ?? "-";
    const diagnosisDeskripsi = data.deskripsiDiagnosis ?? "-"
    const resep = data.resep ?? [];


    return (
        <View className="flex-1 flex-col gap-4">
            <View className="bg-white rounded-xl shadow-md shadow-gray-800 p-4">
                <Text className="font-bold mb-4 text-2xl">Tanda Vital</Text>
                <View className="flex-row gap-20">
                    <View>
                        <Text className="text-gray-500">Tekanan Darah</Text>
                        <Text className="font-semibold">{tekanan}</Text>
                    </View>
                    <View>
                        <Text className="text-gray-500">Detak Jantung</Text>
                        <Text className="font-semibold">{detak}</Text>
                    </View>
                </View>
            </View>

            <View className="bg-white rounded-xl shadow-md shadow-gray-800 p-4">
                <Text className="font-bold mb-2 text-2xl">Keluhan</Text>
                <Text>{keluhan}</Text>
            </View>

            <View className="bg-white rounded-xl shadow-md shadow-gray-800 p-4">
                <Text className="font-bold mb-1 text-2xl">Diagnosa</Text>
                <Text className="mb-4 text-xl font-semibold">{diagnosisDeskripsi}</Text>
                <Text className="text-gray-500">Deskripsi</Text>
                <Text>{diagnosis}</Text>
            </View>

            {resep.length > 0 && (
                <View className="bg-white rounded-xl shadow-md shadow-gray-800 p-4">
                    <Text className="font-bold mb-3 text-2xl">Resep Obat</Text>
                    {resep.map((item, i) => (
                        <View key={i} className="flex-row justify-between mb-2">
                            <View>
                                <Text className="font-semibold">{item.nama}</Text>
                                <Text className="text-sm">{item.frekuensi}</Text>
                            </View>
                            <Text>{item.kekuatan}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>

    )
}