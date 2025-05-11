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
        <View className="space-y-4">
            <View className="bg-white rounded-md p-4">
                <Text className="font-bold mb-1">Tanda Vital</Text>
                <View className="flex-row justify-between">
                    <Text>Tekanan Darah{"\n"}<Text className="font-semibold">{tekanan}</Text></Text>
                    <Text>Detak Jantung{"\n"}<Text className="font-semibold">{detak}</Text></Text>
                </View>
            </View>

            <View className="bg-white rounded-md p-4">
                <Text className="font-bold mb-1">Keluhan</Text>
                <Text>{keluhan}</Text>
            </View>

            <View className="bg-white rounded-md p-4">
                <Text className="font-bold mb-1">Diagnosa</Text>
                <Text>{diagnosisDeskripsi}</Text>
                <Text>{diagnosis}</Text>
            </View>

            {resep.length > 0 && (
                <View className="bg-white rounded-md p-4">
                    <Text className="font-bold mb-1">Resep Obat</Text>
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