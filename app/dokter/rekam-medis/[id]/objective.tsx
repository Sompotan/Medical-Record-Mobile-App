import {View, Text, ScrollView} from "react-native";
import {ObjectiveNoteForm} from "@/types/rekam-medis/types";
import {useLocalSearchParams} from "expo-router";
import {useCallback, useEffect, useState} from "react";
import debounce from "lodash/debounce"
import {autoSaveObjectiveNote, getObjectiveNote} from "@/services/rekamMedisAPI";
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
        tinggiBadan:0,
        imt: 0,
    },
    statusGeneralis: {
        kepalaLeher: "",
        thorax: "",
        abdomen: "",
        ekstremitas: "",
        lainnya: "",
    },
    pemeriksaanPenunjang: ""
}


export default function ObjectivePage() {
    const {id: rekamMedisId} = useLocalSearchParams()
    const [form, setForm] = useState<ObjectiveNoteForm>(initialForm)

    const saveToBackend = async (data: ObjectiveNoteForm) => {
        if (!rekamMedisId) return;

        try {
            await autoSaveObjectiveNote(rekamMedisId as string, {
                pemeriksaanUmum: {
                    keadaanUmum: data.pemeriksaanUmum.keadaanUmum,
                    gcsEye: data.pemeriksaanUmum.gcsEye,
                    gcsVerbal: data.pemeriksaanUmum.gcsVerbal,
                    gcsMotor: data.pemeriksaanUmum.gcsMotor
                },
                tandaVital: {
                    tekananDarah: data.tandaVital.tekananDarah,
                    nadi: data.tandaVital.nadi,
                    suhu: data.tandaVital.suhu,
                    frekuensiNafas: data.tandaVital.frekuensiNafas
                },
                antropometri: {
                    beratBadan: data.antropometri.beratBadan,
                    tinggiBadan: data.antropometri.tinggiBadan,
                    imt: data.antropometri.imt
                },
                statusGeneralis: {
                    kepalaLeher: data.statusGeneralis.kepalaLeher,
                    thorax: data.statusGeneralis.thorax,
                    abdomen: data.statusGeneralis.abdomen,
                    ekstremitas: data.statusGeneralis.ekstremitas,
                    lainnya: data.statusGeneralis.lainnya
                },
                pemeriksaanPenunjang: data.pemeriksaanPenunjang
            });
        } catch (error) {
            console.error("Gagal menyimpan objective: ", error)
        }

    }

    const debouncedSave = useCallback(
        debounce(saveToBackend, 1200, { leading: false, trailing: true }),
        []
    );

    const handleChangePemeriksaanUmum = (field: keyof ObjectiveNoteForm["pemeriksaanUmum"], value: any) => {

        const updated = {
            ...form,
            pemeriksaanUmum: {
                ...form.pemeriksaanUmum,
                [field]: value
            }
        };
        setForm(updated);

        debouncedSave(updated)
    }

    const handleChangeTandaVital = (field: keyof ObjectiveNoteForm["tandaVital"], value: any) => {

        const updated = {
            ...form,
            tandaVital: {
                ...form.tandaVital,
                [field]: value
            }
        };
        setForm(updated);

        debouncedSave(updated)
    }

    const handleChangeAntropometri = (field: keyof ObjectiveNoteForm["antropometri"], value: any) => {


        const updated = {
            ...form,
            antropometri: {
                ...form.antropometri,
                [field]: value
            }
        };
        setForm(updated);

        debouncedSave(updated)
    }

    const handleChangeStatusGeneralis = (field: keyof ObjectiveNoteForm["statusGeneralis"], value: any) => {

        const updated = {
            ...form,
            statusGeneralis: {
                ...form.statusGeneralis,
                [field]: value
            }
        };
        setForm(updated);

        debouncedSave(updated)
    }

    const handleChangePemeriksaanPenunjang = (field: keyof ObjectiveNoteForm, value: any) => {

        const updated = {
            ...form,
            [field]: value
        };
        setForm(updated);

        debouncedSave(updated)
    }




    useEffect(() => {
        const fetchData = async() => {
            if (!rekamMedisId) return;

            try {
                const data = await getObjectiveNote(rekamMedisId as string);

                const prefilledForm: ObjectiveNoteForm = {
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
                    pemeriksaanPenunjang: data.pemeriksaanPenunjang || ""
                }

                setForm(prefilledForm)

            } catch (error) {
                console.error("Gagal load objective: ", error)
            }
        }

        fetchData()

    }, [rekamMedisId]);



    return (
        <ScrollView className="p-4 bg-white">
            <PemeriksaanUmumSection
                form={{
                    keadaanUmum: form.pemeriksaanUmum.keadaanUmum,
                    gcsEye: form.pemeriksaanUmum.gcsEye,
                    gcsVerbal: form.pemeriksaanUmum.gcsVerbal,
                    gcsMotor: form.pemeriksaanUmum.gcsMotor,
                }}
                onChange={handleChangePemeriksaanUmum}
            />
            <TandaVitalSection
                form={{
                    tekananDarah: form.tandaVital.tekananDarah,
                    nadi: form.tandaVital.nadi,
                    suhu: form.tandaVital.suhu,
                    frekuensiNafas: form.tandaVital.frekuensiNafas,
                }}
                onChange={handleChangeTandaVital}
            />
            <AntropometriSection
                form={{
                    beratBadan: form.antropometri.beratBadan,
                    tinggiBadan: form.antropometri.tinggiBadan,
                    imt: form.antropometri.imt
                }}
                onChange={handleChangeAntropometri}
            />
            <StatusGeneralisSection
                form={{
                    kepalaLeher: form.statusGeneralis.kepalaLeher,
                    thorax: form.statusGeneralis.thorax,
                    abdomen: form.statusGeneralis.abdomen,
                    ekstremitas: form.statusGeneralis.ekstremitas,
                    lainnya: form.statusGeneralis.lainnya
                }}
                onChange={handleChangeStatusGeneralis}
            />
            <PemeriksaanPenunjangSection
                value={form.pemeriksaanPenunjang}
                onChange={(v) => handleChangePemeriksaanPenunjang("pemeriksaanPenunjang", v)}
            />
        </ScrollView>
    )
}