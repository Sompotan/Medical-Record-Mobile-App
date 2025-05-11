import { ResepObatFormProps, ResepObatItem } from "@/types/rekam-medis/types";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Trash2 } from "lucide-react-native";
import { Dropdown } from "react-native-element-dropdown";

type Props = ResepObatFormProps & {
    disabled?: boolean;
};

export default function ResepObatForm({
                                          value,
                                          onChange,
                                          obatOptions,
                                          onSearch,
                                          disabled = false,
                                      }: Props) {
    const [newItem, setNewItem] = useState<ResepObatItem>({
        obatId: "",
        frekuensi: "",
        durasi: "",
        aturan_pakai: "",
        catatan: "",
    });

    const [searchKeyword, setSearchKeyword] = useState("");

    const handleAdd = () => {
        if (
            !newItem.obatId ||
            !newItem.frekuensi ||
            !newItem.durasi ||
            !newItem.aturan_pakai
        ) {
            alert("Semua field wajib diisi kecuali catatan");
            return;
        }

        onChange([...value, newItem]);
        setNewItem({
            obatId: "",
            frekuensi: "",
            durasi: "",
            aturan_pakai: "",
            catatan: "",
        });
        setSearchKeyword("");
    };

    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated);
    };

    return (
        <View className="mt-6">
            <Text className="font-semibold text-base mb-2">Resep Obat</Text>

            <Dropdown
                style={{
                    height: 50,
                    backgroundColor: disabled ? "#f3f4f6" : "white",
                    marginBottom: 7,
                    borderRadius: 12,
                    padding: 12,
                }}
                placeholderStyle={{ fontSize: 14, color: "#6b7280" }}
                selectedTextStyle={{ fontSize: 16 }}
                data={obatOptions}
                search
                searchPlaceholder="Cari nama obat..."
                labelField="label"
                valueField="id"
                placeholder="Pilih Obat..."
                value={newItem.obatId}
                onChange={(item) => setNewItem({ ...newItem, obatId: item.id })}
                onChangeText={(text) => {
                    setSearchKeyword(text);
                    onSearch(text);
                }}
                disable={disabled}
            />

            <TextInput
                placeholder="Frekuensi"
                value={newItem.frekuensi}
                onChangeText={(text) => setNewItem({ ...newItem, frekuensi: text })}
                editable={!disabled}
                className="rounded-xl bg-white shadow-md mb-2 text-md px-3 h-[50px]"
            />
            <TextInput
                placeholder="Durasi"
                value={newItem.durasi}
                onChangeText={(text) => setNewItem({ ...newItem, durasi: text })}
                editable={!disabled}
                className="rounded-xl bg-white shadow-md mb-2 text-md px-3 h-[50px]"
            />
            <TextInput
                placeholder="Aturan Pakai"
                value={newItem.aturan_pakai}
                onChangeText={(text) => setNewItem({ ...newItem, aturan_pakai: text })}
                editable={!disabled}
                className="rounded-xl bg-white shadow-md mb-2 text-md px-3 h-[50px]"
            />
            <TextInput
                placeholder="Catatan (opsional)"
                value={newItem.catatan}
                onChangeText={(text) => setNewItem({ ...newItem, catatan: text })}
                editable={!disabled}
                className="rounded-xl bg-white shadow-md mb-4 text-md px-3 h-[50px]"
            />

            {!disabled && (
                <Pressable onPress={handleAdd} className="bg-black py-3 rounded-xl">
                    <Text className="text-white text-center font-semibold text-sm">
                        + Tambah Obat
                    </Text>
                </Pressable>
            )}

            {value.map((item, index) => {
                const obatLabel =
                    obatOptions.find((opt) => opt.id === item.obatId)?.label ||
                    item.obatId;
                return (
                    <View key={index} className="mt-4 p-3 rounded-md bg-white shadow-md">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="font-medium text-sm">{obatLabel}</Text>
                            {!disabled && (
                                <Pressable onPress={() => handleRemove(index)}>
                                    <Trash2 size={18} color="red" />
                                </Pressable>
                            )}
                        </View>
                        <Text className="text-sm">Frekuensi: {item.frekuensi}</Text>
                        <Text className="text-sm">Durasi: {item.durasi}</Text>
                        <Text className="text-sm text-gray-700">Aturan: {item.aturan_pakai}</Text>
                        {item.catatan ? (
                            <Text className="text-sm">Catatan: {item.catatan}</Text>
                        ) : null}
                    </View>
                );
            })}
        </View>
    );
}
