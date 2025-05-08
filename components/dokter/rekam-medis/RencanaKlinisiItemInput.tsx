import { useState } from "react";
import {
    Text,
    TextInput,
    View,
    Pressable
} from "react-native";
import { fetchKodeKlinis } from "@/services/rekamMedisAPI";
import { RencanaKlinisItem } from "@/types/rekam-medis/types";

type Props = {
    onAdd: (rencana: RencanaKlinisItem) => void;
};

export default function RencanaKlinisItemInput({ onAdd }: Props) {
    const [jenisRencana, setJenisRencana] = useState<RencanaKlinisItem["jenisRencana"]>("Tindakan");
    const [kodeKlinisId, setKodeKlinisId] = useState<string | null>(null);
    const [diagnosaLabel, setDiagnosaLabel] = useState<string>("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tanggalRencana, setTanggalRencana] = useState("");

    const handleAdd = () => {
        if (!kodeKlinisId || !deskripsi) return;

        const item: RencanaKlinisItem = {
            kodeKlinisId,
            jenisRencana,
            deskripsi,
            tanggalRencana: jenisRencana === "Monitoring" ? tanggalRencana : undefined
        };

        onAdd(item);
        // Reset
        setKodeKlinisId(null);
        setDiagnosaLabel("");
        setDeskripsi("");
        setTanggalRencana("");
        setJenisRencana("Tindakan");
    };

    return (
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Tambah Rencana Klinis</Text>

            {/* Pilih Jenis Rencana */}
            <View className="flex-row gap-3 mb-2">
                {["PENGOBATAN", "EDUKASI", "MONITORING", "LAINNYA"].map((j) => (
                    <Pressable
                        key={j}
                        onPress={() => setJenisRencana(j as any)}
                        className={`px-3 py-1 rounded-full border ${
                            jenisRencana === j ? "bg-black" : "bg-white"
                        }`}
                    >
                        <Text
                            className={`text-sm ${
                                jenisRencana === j ? "text-white" : "text-black"
                            }`}
                        >
                            {j}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* Diagnosis / Kode Klinis */}
            <Text className="text-sm mb-1">Diagnosis / Kode Klinis</Text>
            <TextInput
                placeholder="Cari kode atau nama diagnosis"
                value={diagnosaLabel}
                onChangeText={async (text) => {
                    setDiagnosaLabel(text);
                    const data = await fetchKodeKlinis(text);
                    if (data.length > 0) {
                        setKodeKlinisId(data[0].id);
                        setDiagnosaLabel(`${data[0].kode} - ${data[0].Display}`);
                    }
                }}
                className="border px-3 py-2 rounded-md bg-white mb-3"
            />

            {/* Tanggal (khusus monitoring) */}
            {jenisRencana === "Monitoring" && (
                <View className="mb-3">
                    <Text className="text-sm mb-1">Tanggal Monitoring</Text>
                    <TextInput
                        value={tanggalRencana}
                        onChangeText={setTanggalRencana}
                        placeholder="YYYY-MM-DD"
                        className="border px-3 py-2 rounded-md bg-white"
                    />
                </View>
            )}

            {/* Deskripsi */}
            <Text className="text-sm mb-1">Catatan / Deskripsi</Text>
            <TextInput
                value={deskripsi}
                onChangeText={setDeskripsi}
                placeholder="Contoh: monitoring tekanan darah"
                multiline
                className="h-24 border px-3 py-2 rounded-md text-sm bg-white"
                textAlignVertical="top"
            />

            {/* Tombol Tambah */}
            <Pressable
                onPress={handleAdd}
                className="bg-black mt-4 py-3 rounded-md items-center"
            >
                <Text className="text-white font-medium">+ Tambah Rencana</Text>
            </Pressable>
        </View>
    );
}
