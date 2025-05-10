import {DiagnosisEntry} from "@/app/dokter/rekam-medis/[id]/assessment";
import {View, Text, Pressable} from "react-native";
import {Trash2} from "lucide-react-native";

export type DiagnosisItemCardProps = {
    item: DiagnosisEntry;
    onRemove: (id: string) => void;
}


export default function DiagnosisItemCard({item, onRemove}: DiagnosisItemCardProps) {
    return (
        <View className="p-4 mb-2 border rounded-xl border-gray-300">
            <View className="flex flex-row items-center justify-between">
                <Text className="font-semibold">{item.nama}</Text>
                <Pressable className="mt-2" onPress={() => onRemove(item.kodeKlinisId)}>
                    <Trash2 size={18} color="red" />
                </Pressable>
            </View>
            <Text className="text-xs text-gray-500 mt-1">{item.deskripsi}</Text>

        </View>
    )
}