import {View, Text, TextInput, ActivityIndicator, FlatList, Pressable} from "react-native";
import {DiagnosisItem} from "@/types/rekam-medis/types";
import { useState } from "react";
import {fetchKodeKlinis} from "@/services/rekamMedisAPI";


export type DiagnosisItemInputProps = {
    onAdd: (item: DiagnosisItem) => void;
}


export default function DiagnosisItemInput({onAdd} : DiagnosisItemInputProps) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [selected, setSelected] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const [jenis, setJenis] = useState<DiagnosisItem["jenis"]>("Utama")
    const [deskripsi, setDeskripsi] = useState("")


    const handleSearch = async (text: string) => {
        setSearch(text)
        setLoading(true);

        try {
            const res = await fetchKodeKlinis(text);
            setResults(res)
        } catch (error) {
            console.error("Gagal mencari kode klinis:", error)
        } finally {
            setLoading(false)
        }

    }

    const handleAdd = () => {
        if (!selected) return;

        onAdd({
            kodeKlinisId: selected.id,
            jenis,
            deskripsi
        })

        setSearch("");
        setSelected(null);
        setResults([])
        setDeskripsi("")
        setJenis("Utama")
    }


    return (
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Tambah Diagnosa</Text>

            <TextInput
                placeholder="Cari diagnosa..."
                value={search}
                onChangeText={handleSearch}
                className="border px-3 py-2 rounded-md bg-white"
            />

            {loading && <ActivityIndicator className="my-2"/>}

            {!selected && results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id}
                    className="border rounded-md mt-2 max-h-40"
                    renderItem={({item}) => (
                        <Pressable
                            onPress={() => setSelected(item)}
                            className="p-2 border-b border-gray-200"
                        >
                            <Text className="font-medium">{item.kode} - {item.Display}</Text>
                            <Text className="text-xs text-gray-500">{item.system}</Text>
                        </Pressable>
                    )}
                />
            )}
            {selected && (
                <View className="mt-3">
                    <Text className="text-sm text-gray-600">Terpilih:</Text>
                    <Text className="text-base font-semibold">{selected.kode} - {selected.Display}</Text>
                </View>
            )}

            <Text className="text-sm mt-4 mb-1">Jenis Diagnosa</Text>
            <View className="flex-row gap-3 mb-2">
                {["Utama", "Banding", "Lainnya"].map((j) => (
                    <Pressable
                        key={j}
                        onPress={() => setJenis(j as DiagnosisItem["jenis"])}
                        className={`px-3 py-1 rounded-full border ${
                            jenis === j ? "bg-black" : "bg-white"
                        }`}
                    >
                        <Text
                            className={`text-sm ${
                                jenis === j ? "text-white" : "text-black"
                            }`}
                        >
                            {j}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Text className="text-sm mb-1">Deskripsi Tambahan</Text>
            <TextInput
                value={deskripsi}
                onChangeText={setDeskripsi}
                multiline
                placeholder="Contoh: kondisi pasien sejak 3 hari lalu..."
                className="h-24 border px-3 py-2 rounded-md text-sm bg-white"
                textAlignVertical="top"
            />

            <Pressable
                onPress={handleAdd}
                className="bg-black mt-4 py-3 rounded-md items-center"
            >
                <Text className="text-white font-medium">+ Tambah Diagnosa</Text>
            </Pressable>


        </View>
    )
}