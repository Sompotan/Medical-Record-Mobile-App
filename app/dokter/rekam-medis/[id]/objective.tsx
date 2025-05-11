import { View, Text, ScrollView } from "react-native";
import { ObjectiveNoteForm } from "@/types/rekam-medis/types";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import {
    autoSaveObjectiveNote,
    getObjectiveNote,
} from "@/services/rekamMedisAPI";
import PemeriksaanUmumSection from "@/components/dokter/rekam-medis/PemeriksaanUmumSection";
import TandaVitalSection from "@/components/dokter/rekam-medis/TandaVitalSection";
import AntropometriSection from "@/components/dokter/rekam-medis/AntropometriSection";
import StatusGeneralisSection from "@/components/dokter/rekam-medis/StatusGeneralisSection";
import PemeriksaanPenunjangSection from "@/components/dokter/rekam-medis/PemeriksaanPenunjangSection";

const initialForm: ObjectiveNoteForm = {
    pemeriksaanUmum: {
        keadaanUmum: "",
        gcsEye: 0,
        gcsVerbal: 0,
        gcsMotor: 0,
    },
    tandaVital: {
        tekananDarah: "",
        nadi: 0,
        suhu: 0,
        frekuensiNafas: 0,
    },
    antropometri: {
        beratBadan: 0,
        tinggiBadan: 0,
        imt: 0,
    },
    statusGeneralis: {
        kepalaLeher: "",
        thorax: "",
        abdomen: "",
        ekstremitas: "",
        lainnya: "",
    },
    pemeriksaanPenunjang: "",
};

export default function ObjectivePage() {
    const { id: rekamMedisId } = useLocalSearchParams();
    const { readonly } = useGlobalSearchParams();
    const isReadOnly = readonly === "true";

    const [form, setForm] = useState<ObjectiveNoteForm>(initialForm);

    const saveToBackend = async (data: ObjectiveNoteForm) => {
        if (!rekamMedisId || isReadOnly) return;
        try {
            await autoSaveObjectiveNote(rekamMedisId as string, data);
        } catch (error) {
            console.error("Gagal menyimpan objective: ", error);
        }
    };

    const debouncedSave = useCallback(
        debounce(saveToBackend, 1200, { leading: false, trailing: true }),
        [rekamMedisId, isReadOnly]
    );

    const updateForm = (key: keyof ObjectiveNoteForm, subKey: string, value: any) => {
        const updated = {
            ...form,
            [key]: {
                ...(form[key] as object),
                [subKey]: value,
            },
        };
        setForm(updated);
        debouncedSave(updated);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!rekamMedisId) return;
            try {
                const data = await getObjectiveNote(rekamMedisId as string);
                const prefilled: ObjectiveNoteForm = {
                    pemeriksaanUmum: {
                        keadaanUmum: data.pemeriksaanUmum?.keadaanUmum || "",
                        gcsEye: data.pemeriksaanUmum?.gcsEye || 0,
                        gcsVerbal: data.pemeriksaanUmum?.gcsVerbal || 0,
                        gcsMotor: data.pemeriksaanUmum?.gcsMotor || 0,
                    },
                    tandaVital: {
                        tekananDarah: data.tandaVital?.tekananDarah || "",
                        nadi: data.tandaVital?.nadi || 0,
                        suhu: data.tandaVital?.suhu || 0,
                        frekuensiNafas: data.tandaVital?.frekuensiNafas || 0,
                    },
                    antropometri: {
                        beratBadan: data.antropometri?.beratBadan || 0,
                        tinggiBadan: data.antropometri?.tinggiBadan || 0,
                        imt: data.antropometri?.imt || 0,
                    },
                    statusGeneralis: {
                        kepalaLeher: data.statusGeneralis?.kepalaLeher || "",
                        thorax: data.statusGeneralis?.thorax || "",
                        abdomen: data.statusGeneralis?.abdomen || "",
                        ekstremitas: data.statusGeneralis?.ektremitas || "",
                        lainnya: data.statusGeneralis?.lainnya || "",
                    },
                    pemeriksaanPenunjang: data.pemeriksaanPenunjang || "",
                };
                setForm(prefilled);
            } catch (error) {
                console.error("Gagal load objective: ", error);
            }
        };
        fetchData();
    }, [rekamMedisId]);

    return (
        <ScrollView className="p-4">
            <PemeriksaanUmumSection
                form={form.pemeriksaanUmum}
                onChange={(key, value) => updateForm("pemeriksaanUmum", key, value)}
                readonly={isReadOnly}
            />
            <TandaVitalSection
                form={form.tandaVital}
                onChange={(key, value) => updateForm("tandaVital", key, value)}
                readonly={isReadOnly}
            />
            <AntropometriSection
                form={form.antropometri}
                onChange={(key, value) => updateForm("antropometri", key, value)}
                readonly={isReadOnly}
            />
            <StatusGeneralisSection
                form={form.statusGeneralis}
                onChange={(key, value) => updateForm("statusGeneralis", key, value)}
                readonly={isReadOnly}
            />
            <PemeriksaanPenunjangSection
                value={form.pemeriksaanPenunjang}
                onChange={(v) => updateForm("pemeriksaanPenunjang", "pemeriksaanPenunjang", v)}
                readonly={isReadOnly}
            />
        </ScrollView>
    );
}
