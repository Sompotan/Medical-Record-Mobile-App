import {View, Text, ScrollView} from "react-native";
import {AssessmentNoteForm, DiagnosisItem} from "@/types/rekam-medis/types";
import {useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {autoSaveAssessmentNote, getAssessmentNote} from "@/services/rekamMedisAPI";
import debounce from "lodash/debounce"
import DiagnosisItemInput from "@/components/dokter/rekam-medis/DiagnosisItemInput";


const initialForm: AssessmentNoteForm = {
    diagnosis: []
}

export default function AssessmentPage() {
    const {id: rekamMedisId} = useLocalSearchParams()
    const [form, setForm] = useState<AssessmentNoteForm>(initialForm)

    const handleAddDiagnosis = (item: DiagnosisItem) => {
        const updated = {
            ...form,
            diagnosis: [...form.diagnosis, item]
        }
        setForm(updated)
        debouncedSave(updated)
    }

    const saveToBackend = async (data: AssessmentNoteForm)=> {
        if (!rekamMedisId) return;

        try {
            await autoSaveAssessmentNote(rekamMedisId as string, data);

        } catch (error) {
            console.error("Gagal menyimpan assessment: ", error)
        }

    }

    const debouncedSave = useCallback(debounce(saveToBackend, 1000), [])

    useEffect(() => {
        const fetchData = async () => {
            if (!rekamMedisId) return;
            try {
                const data = await getAssessmentNote(rekamMedisId as string)
                setForm({
                    diagnosis: data?.diagnosisPasien || []
                });
            } catch (error) {
                console.error("Gagal load assessment: ", error)
            }


        }

        fetchData();
    }, [rekamMedisId]);


    return (
        <ScrollView className="p-4 bg-white">

            <DiagnosisItemInput onAdd={handleAddDiagnosis} />

            <View className="mt-4">
                <Text className="font-medium text-base mb-2">Diagnosa Tersimpan</Text>

                {form.diagnosis.length === 0 ? (
                    <Text className="text-gray-500 text-sm">Belum ada diagnosa ditambahkan.</Text>
                ) : (
                    form.diagnosis.map((d, idx) => (
                        <View
                            key={idx}
                            className="border p-3 rounded-md mb-2 bg-gray-50"
                        >
                            <Text className="font-semibold text-sm mb-1">Jenis: {d.jenis}</Text>
                            <Text className="text-sm text-gray-700">Deskripsi: {d.deskripsi}</Text>
                            <Text className="text-xs mt-1 text-gray-400">
                                Kode Klinis ID: {d.kodeKlinisId}
                            </Text>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    )
}