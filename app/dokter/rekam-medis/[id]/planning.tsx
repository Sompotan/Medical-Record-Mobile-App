import {JenisLayanan, JenisRencana, ObatOption, RencanaEntry, ResepObatItem} from "@/types/rekam-medis/types";
import {useGlobalSearchParams, useLocalSearchParams, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import useDebouncedEffect from "@/hooks/useDeboncedEffect";
import {akhiriPemeriksaan, autoSavePlanningNote, fetchObatOptions, getPlanningNote} from "@/services/rekamMedisAPI";
import {Pressable, ScrollView, Text, View} from "react-native";
import JenisLayananSelect from "@/components/dokter/rekam-medis/planning/JenisLayananSelect";
import JenisRencanaSelect from "@/components/dokter/rekam-medis/planning/JenisRencanaSelect";
import TanggalMonitoringPicker from "@/components/dokter/rekam-medis/planning/TanggalMonitoringPicker";
import DeskripsiInput from "@/components/dokter/rekam-medis/planning/DeskripsiInput";
import ResepObatForm from "@/components/dokter/rekam-medis/planning/ResepObatForm";
import RencanaItemCard from "@/components/dokter/rekam-medis/planning/RencanaItemCard";


export default function PlanningNotePage() {
    const {id: rekamMedisId} = useLocalSearchParams()
    const { kunjunganId } = useGlobalSearchParams()

    const [rencanaList, setRencanaList] = useState<RencanaEntry[]>([])
    const [obatOptions, setObatOptions] = useState<ObatOption[]>([])
    const [searchTerm, setSearchTerm] = useState("");

    const [isEnding, setIsEnding] = useState(false)

    const [jenisRencana, setJenisRencana] = useState<JenisRencana | undefined>(undefined)
    const [jenisLayanan, setJenisLayanan] = useState<JenisLayanan>("")
    const [deskripsi, setDeskripsi] = useState("")
    const [tanggalRencana, setTanggalRencana] = useState<Date | null>(null)
    const [resepObatList, setResepObatList] = useState<ResepObatItem[]>([])

    const allowedDays = ["Selasa", "Kamis"];

    const router = useRouter();

    const handleAddRencana = () => {
        if (!jenisRencana || !deskripsi) return;

        const newRencana: RencanaEntry = {
            jenisRencana,
            deskripsi,
            jenisLayanan,
            tanggalRencana: tanggalRencana?.toISOString(),
            resepObat: resepObatList
        }

        setRencanaList((prev) => [...prev, newRencana])

        setJenisRencana(undefined)
        setJenisLayanan("")
        setDeskripsi("")
        setTanggalRencana(null)
        setResepObatList([])
    }

    const handleRemoveRencana = (index: number) => {
        setRencanaList((prev) => prev.filter((_, i) => i !== index))
    }

    const handleAkhiriPemeriksaan = async () => {
        if (!kunjunganId) {
            alert("ID Kunjungan tidak ditemukan")
            return;
        }

        try {
            setIsEnding((true));
            await akhiriPemeriksaan(kunjunganId as string)

            alert("Pemeriksaan berhasil diakhiri")
            router.push("/dokter/rekam-medis/pemeriksaan-selesai")

        } catch (error) {
            console.error("Gagal mengakhiri pemeriksaan:", error)
            alert("Terjadi kesalahan saat mengakhiri pemeriksaan.");
        }
    }

    useEffect(() => {
        console.log("Rekam Medis ID:", rekamMedisId);
        console.log("Kunjungan ID:", kunjunganId);

        if (!rekamMedisId) return;

        getPlanningNote(rekamMedisId as string)
            .then((data) => {
                setRencanaList(data.rencanaKlinis);
            })
            .catch((err) => {
                console.error("Gagal load planning note:", err);
            });
    }, [rekamMedisId, kunjunganId]);


    useDebouncedEffect(() => {
        if (!rekamMedisId || isEnding) return;

        autoSavePlanningNote(rekamMedisId as string, {
            rencanaKlinis: rencanaList,
        }).catch((err) => console.error("Gagal autosave:", err))

        fetchObatOptions(searchTerm)
            .then(setObatOptions)
            .catch((err) => console.error("Gagal search obat: ", err))
    }, [rencanaList], 1200)

    useDebouncedEffect(() => {
        if (searchTerm.trim() === "") return;

        fetchObatOptions(searchTerm)
            .then(setObatOptions)
            .catch((err) => console.error("Gagal search obat: ", err))

    }, [searchTerm], 500)

    return (
        <View className="flex-1">
            <ScrollView className="px-4 pb-8">
                <JenisLayananSelect value={jenisLayanan} onChange={setJenisLayanan}/>
                <JenisRencanaSelect value={jenisRencana} onChange={setJenisRencana}/>

                {jenisRencana === "Monitoring" && (
                    <TanggalMonitoringPicker value={tanggalRencana} onChange={setTanggalRencana} allowedDays={allowedDays}  />
                )}

                <DeskripsiInput value={deskripsi} onChange={setDeskripsi}/>

                {jenisRencana === "Tindakan" && (
                    <ResepObatForm
                        value={resepObatList}
                        onChange={setResepObatList}
                        obatOptions={obatOptions}
                        onSearch={setSearchTerm}
                    />
                )}

                <Pressable
                    onPress={handleAddRencana}
                    className={`mt-4 py-3 px-4 rounded-md ${jenisRencana && deskripsi ? "bg-black" : "bg-gray-300"}`}
                    disabled={!jenisRencana || !deskripsi}
                >
                    <Text className="text-white text-center font-semibold">+ Tambah Rencana</Text>
                </Pressable>

                {rencanaList.map((item, index) => (
                    <RencanaItemCard
                        key={index}
                        item={item}
                        index={index}
                        onRemove={handleRemoveRencana}
                        getObatLabelById={(id) => obatOptions.find((o) => o.id === id)?.label || id}
                    />
                ))}

            </ScrollView>
            <View className="absolute bottom-4 left-4 right-4">
                <Pressable
                    onPress={handleAkhiriPemeriksaan}
                    className="bg-black py-4 rounded-xl"
                >
                    <Text className="text-white text-center font-semibold">Akhiri Pemeriksaan</Text>
                </Pressable>
            </View>
        </View>

    )

}