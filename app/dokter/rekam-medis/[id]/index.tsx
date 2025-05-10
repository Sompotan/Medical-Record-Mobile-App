import {View, Text, ScrollView} from "react-native";
import TextInputField from "@/components/dokter/rekam-medis/TextInputField";
import {FieldInputKey, SubjectiveNoteForm} from "@/types/rekam-medis/types";
import {useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {autoSaveSubjectiveNote, getSubjectiveNote} from "@/services/rekamMedisAPI";
import debounce from "lodash/debounce"

const initialForm: SubjectiveNoteForm = {
    keluhanUtama: "",
    keluhanTambahan: "",
    riwayatSekarang: "",
    riwayatDahulu: "",
    riwayatKeluarga: "",
    alergiObat: "",
    alergiMakanan: "",
    obatDikonsumsi: ""
}


export default function SubjectivePage() {
    const {id: rekamMedisId} = useLocalSearchParams()
    const [form, setForm] = useState<SubjectiveNoteForm>(initialForm)

    const saveToBackend = async (data: SubjectiveNoteForm) => {
        if (!rekamMedisId) return;
        await autoSaveSubjectiveNote(rekamMedisId as string, {
            keluhanPasien: [
                {deskripsi: data.keluhanUtama, jenisKeluhan: "Utama"},
                {deskripsi: data.keluhanTambahan, jenisKeluhan: "Tambahan"}
            ].filter(item => item.deskripsi !== ""),
            riwayatPenyakit: [
                {deskripsi: data.riwayatSekarang, jenisRiwayat: "Sekarang"},
                {deskripsi: data.riwayatDahulu, jenisRiwayat: "Dahulu"},
                {deskripsi: data.riwayatKeluarga, jenisRiwayat: "Keluarga"}
            ],
            alergiPasien: [
                {deskripsi: data.alergiObat, jenisAlergi: "Obat"},
                {deskripsi: data.alergiMakanan, jenisAlergi: "Makanan"}
            ],
            obatDikonsumsi: [
                {keterangan: data.obatDikonsumsi}
            ]
        })

    }

    const debouncedSave = useCallback(
        debounce(saveToBackend, 1200, { leading: false, trailing: true }),
        []
    );

    const handelChange = (field: FieldInputKey, value: string) => {
        const updated = {...form, [field]: value};
        setForm(updated)
        debouncedSave(updated);
    }

    useEffect(() => {
        const fetchSubjectiveNote = async () => {
            if (!rekamMedisId) return;

            try {
                const data = await getSubjectiveNote(rekamMedisId as string);


                setForm({
                    keluhanUtama: data.keluhanPasien.find((k: { jenisKeluhan: string; }) => k.jenisKeluhan === "Utama")?.deskripsi || "",
                    keluhanTambahan: data.keluhanPasien.find((k: { jenisKeluhan: string; }) => k.jenisKeluhan === "Tambahan")?.deskripsi || "",
                    riwayatSekarang: data.riwayatPenyakit.find((k: { jenisRiwayat: string; }) => k.jenisRiwayat === "Sekarang")?.deskripsi || "",
                    riwayatDahulu: data.riwayatPenyakit.find((k: { jenisRiwayat: string; }) => k.jenisRiwayat === "Dahulu")?.deskripsi || "",
                    riwayatKeluarga: data.riwayatPenyakit.find((k: { jenisRiwayat: string; }) => k.jenisRiwayat === "Keluarga")?.deskripsi || "",
                    alergiObat: data.alergiPasien.find((k: { jenisAlergi: string; }) => k.jenisAlergi === "Obat")?.deskripsi || "",
                    alergiMakanan: data.alergiPasien.find((k: { jenisAlergi: string; }) => k.jenisAlergi === "Makanan")?.deskripsi || "",
                    obatDikonsumsi: data.obatDikonsumsi?.[0]?.keterangan || ""
                })


            } catch (error) {
                console.error("Gagal memuat subjective note", error)
            }

        }

        fetchSubjectiveNote()
    }, [rekamMedisId]);


    return (
        <ScrollView
            className="p-4"
            contentContainerStyle={{
                paddingBottom: 20
            }}
        >
            <TextInputField
                label="Keluhan Utama"
                placeholder="Masukkan keluhan utama"
                onChange={(text) => handelChange("keluhanUtama", text)}
                value={form.keluhanUtama}
            />
            <TextInputField
                label="Keluhan Tambahan"
                placeholder="Masukkan keluhan tambahan"
                onChange={(text) => handelChange("keluhanTambahan", text)}
                value={form.keluhanTambahan}
            />
            <TextInputField
                label="Riwayat Penyakit Sekarang"
                placeholder="Masukkan riwayat penyakit sekarang"
                onChange={(text) => handelChange("riwayatSekarang", text)}
                value={form.riwayatSekarang}
            />
            <TextInputField
                label="Riwayat Penyakit Dahulu"
                placeholder="Masukkan riwayat penyakit dahulu"
                onChange={(text) => handelChange("riwayatDahulu", text)}
                value={form.riwayatDahulu}
            />
            <TextInputField
                label="Riwayat Penyakit Keluarga"
                placeholder="Masukkan riwayat penyakit keluarga"
                onChange={(text) => handelChange("riwayatKeluarga", text)}
                value={form.riwayatKeluarga}
            />
            <TextInputField
                label="Alergi Obat"
                placeholder="Masukkan Alergi Obat"
                onChange={(text) => handelChange("alergiObat", text)}
                value={form.alergiObat}
            />
            <TextInputField
                label="Alergi Makanan"
                placeholder="Masukkan Alergi Makanan"
                onChange={(text) => handelChange("alergiMakanan", text)}
                value={form.alergiMakanan}
            />
            <TextInputField
                label="Obat yang sedang di konsumsi"
                placeholder="Masukkan obat yang sedang di konsumsi"
                onChange={(text) => handelChange("obatDikonsumsi", text)}
                value={form.obatDikonsumsi}
            />
        </ScrollView>
    )
}