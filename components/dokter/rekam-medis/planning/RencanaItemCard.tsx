import { RencanaItemCardProps } from "@/types/rekam-medis/types";
import { Pressable, Text, View } from "react-native";
import { Trash2 } from "lucide-react-native";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";

type Props = RencanaItemCardProps & {
    readonly?: boolean;
};

export default function RencanaItemCard({
                                            item,
                                            index,
                                            onRemove,
                                            getObatLabelById,
                                            readonly = false,
                                        }: Props) {
    const tanggalFormatted = item.tanggalRencana
        ? format(new Date(item.tanggalRencana), "dd MMMM yyyy", {
            locale: localeID,
        })
        : null;

    return (
        <View className="mt-4 p-4 rounded-xl bg-white shadow-md">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="font-semibold text-sm">
                    {index + 1}. Rencana {item.jenisRencana}
                </Text>
                {!readonly && (
                    <Pressable onPress={() => onRemove(index)}>
                        <Trash2 size={18} color="red" />
                    </Pressable>
                )}
            </View>

            {tanggalFormatted && (
                <Text className="text-sm mb-1">Tanggal: {tanggalFormatted}</Text>
            )}

            <Text className="text-sm mb-1">Deskripsi: {item.deskripsi}</Text>

            {item.resepObat && item.resepObat.length > 0 && (
                <View className="mt-2">
                    <Text className="text-sm font-medium mb-1">Resep Obat:</Text>
                    {item.resepObat.map((obat, i) => (
                        <View key={i} className="ml-2 mb-2">
                            <Text className="text-sm">
                                • {obat.namaObat ?? getObatLabelById?.(obat.obatId) ?? `Obat ID: ${obat.obatId}`}
                            </Text>
                            <Text className="text-sm ml-2">Frekuensi: {obat.frekuensi}</Text>
                            <Text className="text-sm ml-2">Durasi: {obat.durasi}</Text>
                            <Text className="text-sm ml-2">Aturan: {obat.aturan_pakai}</Text>
                            {obat.catatan && (
                                <Text className="text-sm ml-2">Catatan: {obat.catatan}</Text>
                            )}
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}
