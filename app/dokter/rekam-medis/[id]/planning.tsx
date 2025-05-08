import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import debounce from "lodash/debounce"

import { PlanningNoteForm, RencanaKlinisItem } from "@/types/rekam-medis/types";
import RencanaKlinisItemInput from "@/components/dokter/rekam-medis/RencanaKlinisiItemInput" ;
import { getPlanningNote, autoSavePlanningNote } from "@/services/rekamMedisAPI";

const initialForm: PlanningNoteForm = {
    rencanaKlinis: []
};

export default function PlanningPage() {
    const { id: rekamMedisId } = useLocalSearchParams();
    const [form, setForm] = useState<PlanningNoteForm>(initialForm);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const saveToBackend = async (data: PlanningNoteForm) => {
        if (!rekamMedisId) return;
        try {
            await autoSavePlanningNote(rekamMedisId as string, data);
            setLastSaved(new Date());
        } catch (err) {
            console.error("Gagal menyimpan planning:", err);
        }
    };

    const debouncedSave = useCallback(debounce(saveToBackend, 1000), []);

    const handleAddRencana = (item: RencanaKlinisItem) => {
        const updated = {
            ...form,
            rencanaKlinis: [...form.rencanaKlinis, item]
        };
        setForm(updated);
        debouncedSave(updated);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!rekamMedisId) return;
            try {
                const data = await getPlanningNote(rekamMedisId as string);
                setForm({
                    rencanaKlinis: data?.rencanaKlinis || []
                });
            } catch (err) {
                console.error("Gagal load planning note:", err);
            }
        };

        fetchData();
    }, [rekamMedisId]);

    return (
        <ScrollView className="p-4 bg-white">
            {lastSaved && (
                <Text className="text-xs text-gray-500 mb-4">
                    Terakhir disimpan: {lastSaved.toLocaleTimeString()}
                </Text>
            )}

            <RencanaKlinisItemInput onAdd={handleAddRencana} />

            <View className="mt-4">
                <Text className="font-medium text-base mb-2">Rencana Tersimpan</Text>

                {form.rencanaKlinis.length === 0 ? (
                    <Text className="text-gray-500 text-sm">Belum ada rencana ditambahkan.</Text>
                ) : (
                    form.rencanaKlinis.map((r, idx) => (
                        <View
                            key={idx}
                            className="border p-3 rounded-md mb-2 bg-gray-50"
                        >
                            <Text className="font-semibold text-sm mb-1">Jenis: {r.jenisRencana}</Text>
                            <Text className="text-sm text-gray-700">Deskripsi: {r.deskripsi}</Text>
                            {r.tanggalRencana && (
                                <Text className="text-xs mt-1 text-gray-400">
                                    Tanggal Monitoring: {r.tanggalRencana}
                                </Text>
                            )}
                            <Text className="text-xs text-gray-400">
                                Kode Klinis ID: {r.kodeKlinisId}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
}
