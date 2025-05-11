import { View, Text, ScrollView } from "react-native";
import TextInputField from "@/components/dokter/rekam-medis/TextInputField";
import { FieldInputKey, SubjectiveNoteForm } from "@/types/rekam-medis/types";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { autoSaveSubjectiveNote, getSubjectiveNote } from "@/services/rekamMedisAPI";
import debounce from "lodash/debounce";

const initialForm: SubjectiveNoteForm = {
    keluhanUtama: "",
    keluhanTambahan: "",
    riwayatSekarang: "",
    riwayatDahulu: "",
    riwayatKeluarga: "",
    alergiObat: "",
    alergiMakanan: "",
    obatDikonsumsi: ""
};

export default function SubjectivePage() {
    const { id: rekamMedisId } = useLocalSearchParams();
    const { readonly } = useGlobalSearchParams();
    const isReadonly = readonly === "true";

    const [form, setForm] = useState<SubjectiveNoteForm>(initialForm);

    const saveToBackend = async (data: SubjectiveNoteForm) => {
        if (!rekamMedisId || isReadonly) return;

        await autoSaveSubjectiveNote(rekamMedisId as string, {
            keluhanPasien: [
                { deskripsi: data.keluhanUtama, jenisKeluhan: "Utama" },
                { deskripsi: data.keluhanTambahan, jenisKeluhan: "Tambahan" }
            ].filter(item => item.deskripsi !== ""),
            riwayatPenyakit: [
                { deskripsi: data.riwayatSekarang, jenisRiwayat: "Sekarang" },
                { deskripsi: data.riwayatDahulu, jenisRiwayat: "Dahulu" },
                { deskripsi: data.riwayatKeluarga, jenisRiwayat: "Keluarga" }
            ],
            alergiPasien: [
                { deskripsi: data.alergiObat, jenisAlergi: "Obat" },
                { deskripsi: data.alergiMakanan, jenisAlergi: "Makanan" }
            ],
            obatDikonsumsi: [{ keterangan: data.obatDikonsumsi }]
        });
    };

    const debouncedSave = useCallback(
        debounce(saveToBackend, 1200),
        [rekamMedisId, isReadonly]
    );

    const handleChange = (field: FieldInputKey, value: string) => {
        const updated = { ...form, [field]: value };
        setForm(updated);
        debouncedSave(updated);
    };

    useEffect(() => {
        const fetchSubjectiveNote = async () => {
            if (!rekamMedisId) return;
            try {
                const data = await getSubjectiveNote(rekamMedisId as string);
                setForm({
                    keluhanUtama: data.keluhanPasien.find((k: any) => k.jenisKeluhan === "Utama")?.deskripsi || "",
                    keluhanTambahan: data.keluhanPasien.find((k: any) => k.jenisKeluhan === "Tambahan")?.deskripsi || "",
                    riwayatSekarang: data.riwayatPenyakit.find((k: any) => k.jenisRiwayat === "Sekarang")?.deskripsi || "",
                    riwayatDahulu: data.riwayatPenyakit.find((k: any) => k.jenisRiwayat === "Dahulu")?.deskripsi || "",
                    riwayatKeluarga: data.riwayatPenyakit.find((k: any) => k.jenisRiwayat === "Keluarga")?.deskripsi || "",
                    alergiObat: data.alergiPasien.find((k: any) => k.jenisAlergi === "Obat")?.deskripsi || "",
                    alergiMakanan: data.alergiPasien.find((k: any) => k.jenisAlergi === "Makanan")?.deskripsi || "",
                    obatDikonsumsi: data.obatDikonsumsi?.[0]?.keterangan || ""
                });
            } catch (error) {
                console.error("Gagal memuat subjective note", error);
            }
        };

        fetchSubjectiveNote();
    }, [rekamMedisId]);

    return (
        <ScrollView className="p-4" contentContainerStyle={{ paddingBottom: 20 }}>
            <TextInputField
                label="Keluhan Utama"
                placeholder="Masukkan keluhan utama"
                onChange={(text) => handleChange("keluhanUtama", text)}
                value={form.keluhanUtama}
                readonly={isReadonly}
            />
            <TextInputField
                label="Keluhan Tambahan"
                placeholder="Masukkan keluhan tambahan"
                onChange={(text) => handleChange("keluhanTambahan", text)}
                value={form.keluhanTambahan}
                readonly={isReadonly}
            />
            <TextInputField
                label="Riwayat Penyakit Sekarang"
                placeholder="Masukkan riwayat penyakit sekarang"
                onChange={(text) => handleChange("riwayatSekarang", text)}
                value={form.riwayatSekarang}
                readonly={isReadonly}
            />
            <TextInputField
                label="Riwayat Penyakit Dahulu"
                placeholder="Masukkan riwayat penyakit dahulu"
                onChange={(text) => handleChange("riwayatDahulu", text)}
                value={form.riwayatDahulu}
                readonly={isReadonly}
            />
            <TextInputField
                label="Riwayat Penyakit Keluarga"
                placeholder="Masukkan riwayat penyakit keluarga"
                onChange={(text) => handleChange("riwayatKeluarga", text)}
                value={form.riwayatKeluarga}
                readonly={isReadonly}
            />
            <TextInputField
                label="Alergi Obat"
                placeholder="Masukkan Alergi Obat"
                onChange={(text) => handleChange("alergiObat", text)}
                value={form.alergiObat}
                readonly={isReadonly}
            />
            <TextInputField
                label="Alergi Makanan"
                placeholder="Masukkan Alergi Makanan"
                onChange={(text) => handleChange("alergiMakanan", text)}
                value={form.alergiMakanan}
                readonly={isReadonly}
            />
            <TextInputField
                label="Obat yang sedang di konsumsi"
                placeholder="Masukkan obat yang sedang di konsumsi"
                onChange={(text) => handleChange("obatDikonsumsi", text)}
                value={form.obatDikonsumsi}
                readonly={isReadonly}
            />
        </ScrollView>
    );
}
