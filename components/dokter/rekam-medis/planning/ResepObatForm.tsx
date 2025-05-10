import {ResepObatFormProps, ResepObatItem} from "@/types/rekam-medis/types";
import {useState} from "react";
import {Pressable, Text, TextInput, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {Trash2} from "lucide-react-native";

export default function ResepObatForm({value, onChange, obatOptions, onSearch}: ResepObatFormProps) {
    const [newItem, setNewItem] = useState<ResepObatItem>({
        obatId: "",
        frekuensi: "",
        durasi: "",
        aturan_pakai: "",
        catatan: "",
    })

    const [searchKeyword, setSearchKeyword] = useState("")

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

        onChange([...value, newItem])
        setNewItem({
            obatId: "",
            frekuensi: "",
            durasi: "",
            aturan_pakai: "",
            catatan: ""
        })
        setSearchKeyword("")
    }



    const handleRemove = (index: number) => {
        const updated = [...value];
        updated.splice(index, 1);
        onChange(updated)
    }

    return (
        <View className="mt-6">
            <Text className="font-semibold text-base mb-2">Resep Obat</Text>

            <Text className="text-sm mb-1">Cari Obat</Text>
            <TextInput
                placeholder="Ketik nama obat..."
                value={searchKeyword}
                onChangeText={(text) => {
                    setSearchKeyword(text);
                    onSearch(text); // 🔁 trigger pencarian ke backend
                }}
                className="border px-3 py-2 rounded-md bg-white mb-2 text-sm"
            />

            <Text className="mb-1 text-sm">Pilih Obat</Text>
            <View className="border rounded-md bg-white mb-2">
                <Picker
                    selectedValue={newItem.obatId}
                    onValueChange={(val) => setNewItem({...newItem, obatId: val})}
                >
                    <Picker.Item label="Pilih obat..." value="" />
                    {obatOptions.map((opt) => (
                        <Picker.Item key={opt.id} label={opt.label} value={opt.id} />
                    ))}
                </Picker>

            </View>

            <TextInput
                placeholder="Frekuensi"
                value={newItem.frekuensi}
                onChangeText={(text) => setNewItem({ ...newItem, frekuensi: text })}
                className="border px-3 py-2 rounded-md bg-white mb-2 text-sm"
            />
            <TextInput
                placeholder="Durasi"
                value={newItem.durasi}
                onChangeText={(text) => setNewItem({ ...newItem, durasi: text })}
                className="border px-3 py-2 rounded-md bg-white mb-2 text-sm"
            />
            <TextInput
                placeholder="Aturan Pakai"
                value={newItem.aturan_pakai}
                onChangeText={(text) => setNewItem({ ...newItem, aturan_pakai: text })}
                className="border px-3 py-2 rounded-md bg-white mb-2 text-sm"
            />
            <TextInput
                placeholder="Catatan (opsional)"
                value={newItem.catatan}
                onChangeText={(text) => setNewItem({ ...newItem, catatan: text })}
                className="border px-3 py-2 rounded-md bg-white mb-4 text-sm"
            />

            <Pressable onPress={handleAdd} className="bg-black py-3 rounded-md">
                <Text className="text-white text-center font-semibold text-sm">+ Tambah Obat</Text>
            </Pressable>

            {value.map((item, index) => {
                const obatLabel = obatOptions.find((opt) => opt.id === item.obatId)?.label || item.obatId;
                return (
                    <View key={index} className="mt-4 p-3 border rounded-md bg-white">
                        <View className="flex-row justify-between items-center mb-2">
                            <Text className="font-medium text-sm">{obatLabel}</Text>
                            <Pressable onPress={() => handleRemove(index)}>
                                <Trash2 size={18} color="red" />
                            </Pressable>
                        </View>
                        <Text className="text-sm">Frekuensi: {item.frekuensi}</Text>
                        <Text className="text-sm">Durasi: {item.durasi}</Text>
                        <Text className="text-sm">Aturan: {item.aturan_pakai}</Text>
                        {item.catatan ? <Text className="text-sm">Catatan: {item.catatan}</Text> : null}
                    </View>
                );
            })}

        </View>
    )

}