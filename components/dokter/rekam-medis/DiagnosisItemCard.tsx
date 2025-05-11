import { DiagnosisEntry } from "@/app/dokter/rekam-medis/[id]/assessment";
import { View, Text, Pressable } from "react-native";
import { Trash2 } from "lucide-react-native";

export type DiagnosisItemCardProps = {
    item: DiagnosisEntry;
    onRemove: (id: string) => void;
    readonly?: boolean;
};

export default function DiagnosisItemCard({ item, onRemove, readonly = false }: DiagnosisItemCardProps) {
    return (
        <View className="p-4 mb-2 border rounded-xl border-gray-300 bg-white">
            <View className="flex flex-row items-center justify-between">
                <Text className="font-semibold">{item.nama}</Text>
                {!readonly && (
                    <Pressable className="mt-2" onPress={() => onRemove(item.kodeKlinisId)}>
                        <Trash2 size={18} color="red" />
                    </Pressable>
                )}
            </View>
            <Text className="text-xs text-gray-500 mt-1">{item.deskripsi}</Text>
        </View>
    );
}
