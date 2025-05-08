import {DiagnosisEntry} from "@/app/dokter/rekam-medis/[id]/assessment";
import {View, Text, Pressable} from "react-native";

export type DiagnosisItemCardProps = {
    item: DiagnosisEntry;
    onRemove: (id: string) => void;
}


export default function DiagnosisItemCard({item, onRemove}: DiagnosisItemCardProps) {
    return (
        <View className="border p-3 mb-2 rounded-md bg-white">
            <Text className="font-semibold">{item.nama}</Text>
            <Text className="text-xs text-gray-500 mt-1">{item.deskripsi}</Text>
            <Pressable className="mt-2" onPress={() => onRemove(item.kodeKlinisId)}>
                <Text className="text-red-500 text-sm">Hapus</Text>
            </Pressable>
        </View>
    )
}