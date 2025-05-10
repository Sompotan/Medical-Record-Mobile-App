import {View, Text, TextInput, Pressable, Alert, ScrollView} from "react-native";
import {useEffect, useState} from "react";
import DiagnosisCombobox, {DiagnosisOption} from "@/components/dokter/rekam-medis/DiagnosisCombobox";
import JenisDiagnosisSelect from "@/components/dokter/rekam-medis/JenisDiagnosisSelect";
import DiagnosisItemCard from "@/components/dokter/rekam-medis/DiagnosisItemCard";
import {useAutoSaveAssessment} from "@/hooks/useAutoSaveAssessment";
import {useLocalSearchParams} from "expo-router";
import {autoSaveAssessmentNote, getAssessmentNote} from "@/services/rekamMedisAPI";
import useDebouncedEffect from "@/hooks/useDeboncedEffect";

export type DiagnosisEntry = {
    kodeKlinisId: string;
    nama?: string;
    jenisDiagnosis: "Utama" | "Banding" | "Lain";
    deskripsi: string;
}

export default function AssessmentPage() {
    const {id: rekamMedisId} = useLocalSearchParams()
    const [selectedDiagnosis, setSelectedDiagnosis] = useState<DiagnosisOption | null>(null)
    const [opsiDiagnosis, setOpsiDiagnosis] = useState<"Utama" | "Banding" | "Lain" | "">("")
    const [deskripsi, setDeskripsi] = useState("");
    const [diagnosisList, setDiagnosisList] = useState<DiagnosisEntry[]>([])


    const handleAddDiagnosis = () => {
        if (!selectedDiagnosis || !opsiDiagnosis) return;

        const exists = diagnosisList.some((d) => d.jenisDiagnosis === opsiDiagnosis && (opsiDiagnosis === "Utama" || opsiDiagnosis === "Banding"));
        if (exists) return alert(`Diagnosis ${opsiDiagnosis} hanya boleh satu.`)

        const newEntry: DiagnosisEntry = {
            kodeKlinisId: selectedDiagnosis.id,
            nama: selectedDiagnosis.Display,
            jenisDiagnosis: opsiDiagnosis,
            deskripsi
        }

        setDiagnosisList([...diagnosisList, newEntry])
        setSelectedDiagnosis(null);
        setOpsiDiagnosis("")
        setDeskripsi("")

    }

    const handleRemove = (kodeKlinisId: string) => {
        setDiagnosisList(diagnosisList.filter((d) => d.kodeKlinisId !== kodeKlinisId))
    }


    useEffect(() => {
        const fetchData = async () => {
            if (!rekamMedisId) return;
            try {
                const data = await getAssessmentNote(rekamMedisId as string);
                if (data.diagnosisPasien) {
                    const prefilled = data.diagnosisPasien.map((d: any) => ({
                        kodeKlinisId: d.kodeKlinisId,
                        nama: d.nama,
                        jenisDiagnosis: d.jenisDiagnosis,
                        deskripsi: d.deskripsi
                    }))
                    setDiagnosisList(prefilled)
                }
            } catch (error) {
                console.error("Gagal memuat assessment note:", error)
            }
        }
        fetchData()
    }, [rekamMedisId]);


    useDebouncedEffect(() => {
        if (!rekamMedisId || diagnosisList.length === 0) return;

        const isValid = diagnosisList.every(
            d => d.kodeKlinisId && d.jenisDiagnosis && d.deskripsi !== undefined
        );
        if (!isValid) return;

        const autosave = async () => {
            const payload = {
                diagnosisPasien: diagnosisList.map(({kodeKlinisId, jenisDiagnosis, deskripsi}) => ({
                    kodeKlinisId,
                    jenisDiagnosis,
                    deskripsi
                }))
            };

            try {
                await autoSaveAssessmentNote(rekamMedisId as string, payload);
            } catch (err) {
                console.error("Gagal autosave assessment: ", err);
            }
        };

        autosave();
    }, [diagnosisList], 1200);


    return (
        <ScrollView className="px-4">
            <DiagnosisCombobox
                label="Diagnosa"
                value={selectedDiagnosis}
                onChange={setSelectedDiagnosis}
            />

            <JenisDiagnosisSelect
                value={opsiDiagnosis}
                onChange={setOpsiDiagnosis}
            />

            <Text className="mb-1">Deskripsi Diagnosa</Text>
            <TextInput
                placeholder="Masukkan deskripsi diagnosa pasien..."
                value={deskripsi}
                onChangeText={setDeskripsi}
                multiline
                textAlignVertical="top"
                className="rounded-xl shadow-md shadow-gray-400 border border-gray-300 px-3 py-2 bg-white text-sm h-24"
            />

            <Pressable
                className={`mt-4 py-3 px-4 rounded-md ${selectedDiagnosis && opsiDiagnosis ? "bg-black" : "bg-gray-300"}`}
                onPress={handleAddDiagnosis}
                disabled={!selectedDiagnosis || !opsiDiagnosis}
            >
                <Text className="text-white text-center font-semibold">+ Tambah Diagnosa</Text>
            </Pressable>


            {/* Diagnosis Section */}
            {["Utama", "Banding", "Lain"].map((jenis) =>
                diagnosisList.some(d => d.jenisDiagnosis === jenis) ? (
                    <View key={jenis} className="mt-6 bg-white p-4">
                        <Text className="font-semibold text-xl mb-2">Diagnosa {jenis}</Text>
                        {diagnosisList.filter(d => d.jenisDiagnosis === jenis).map((item) => (
                            <DiagnosisItemCard key={item.kodeKlinisId} item={item} onRemove={handleRemove} />
                        ))}
                    </View>
                ) : null
            )}

        </ScrollView>
    )
}