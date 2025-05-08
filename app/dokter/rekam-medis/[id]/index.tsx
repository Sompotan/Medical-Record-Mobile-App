import {View, Text, ScrollView} from "react-native";
import TextInputField from "@/components/dokter/rekam-medis/TextInputField";
import {FieldInputKey, SubjectiveNoteForm} from "@/types/rekam-medis/types";
import {useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import {autoSaveSubjectiveNote, getSubjectiveNote} from "@/services/rekamMedisAPI";
import {debounce} from "expo-dev-launcher/bundle/functions/debounce";

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
                {deskripsi: data.keluhanUtama, jenis: "Utama"},
                {deskripsi: data.keluhanTambahan, jenis: "Tambahan"}
            ],
            riwayatPenyakit: [
                {deskripsi: data.riwayatSekarang, jenis: "Sekarang"},
                {deskripsi: data.riwayatDahulu, jenis: "Dahulu"},
                {deskripsi: data.riwayatKeluarga, jenis: "Keluarga"}
            ],
            alergiPasien: [
                {deskripsi: data.alergiObat, jenis: "Obat"},
                {deskripsi: data.alergiMakanan, jenis: "Makanan"}
            ],
            obatDikonsumsi: [
                {deskripsi: data.obatDikonsumsi}
            ]
        })

    }

    const debouncedSave = useCallback(debounce(saveToBackend, 1000), [])

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
                    keluhanUtama: data.keluhanPasien.find((k: { jenis: string; }) => k.jenis === "Utama")?.deskripsi || "",
                    keluhanTambahan: data.keluhanPasien.find((k: { jenis: string; }) => k.jenis === "Tambahan")?.deskripsi || "",
                    riwayatSekarang: data.riwayatPenyakit.find((k: { jenis: string; }) => k.jenis === "Sekarang")?.deskripsi || "",
                    riwayatDahulu: data.riwayatPenyakit.find((k: { jenis: string; }) => k.jenis === "Dahulu")?.deskripsi || "",
                    riwayatKeluarga: data.riwayatPenyakit.find((k: { jenis: string; }) => k.jenis === "Keluarga")?.deskripsi || "",
                    alergiObat: data.alergiPasien.find((k: { jenis: string; }) => k.jenis === "Obat")?.deskripsi || "",
                    alergiMakanan: data.alergiPasien.find((k: { jenis: string; }) => k.jenis === "Makanan")?.deskripsi || "",
                    obatDikonsumsi: data.obatDikonsumsi?.[0]?.deskripsi || ""
                })


            } catch (error) {
                console.error("Gagal memuat subjective note", error)
            }

        }

        fetchSubjectiveNote()
    }, [rekamMedisId]);


    return (
        <ScrollView
            className="p-4 bg-white"
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