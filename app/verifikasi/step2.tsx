import {useEffect, useState} from "react";
import {getStepDraft, saveStepDraft} from "@/services/formDraftService";
import {ScrollView, View} from "react-native";
import InputField from "@/components/common/InputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {router} from "expo-router";

export default function step2() {
    const [jalan, setJalan]= useState("")
    const [rtRw, setRtRw]= useState("")
    const [lingkungan, setLingkungan]= useState("")
    const [kelurahan, setKelurahan]= useState("")
    const [kecamatan, setKecamatan] = useState("")
    const [kota, setKota] = useState("")

    useEffect(() => {
        const loadDraft = async () => {
            const draft = await getStepDraft(2);
            if (draft) {
                setJalan(draft.jalan || "")
                setRtRw(draft.rtRw || "")
                setLingkungan(draft.lingkungan || "")
                setKelurahan(draft.kelurahan || "")
                setKecamatan(draft.kecamatan || "")
                setKota(draft.kota || "")
            }
        }

        loadDraft()
    }, []);

    useEffect(() => {
        saveStepDraft(2, {
            jalan,
            rtRw,
            lingkungan,
            kelurahan,
            kecamatan,
            kota
        })
    }, [jalan, rtRw, lingkungan, kelurahan, kecamatan, kota]);

    const handleNext = () => {
        router.push("/verifikasi/step3")
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{paddingBottom: 20}}
            >
                <InputField
                    label="Jalan"
                    placeholder="Masukkan nama jalan alamat anda"
                    value={jalan}
                    onChangeText={setJalan}
                />

                <InputField
                    label="RT / RW"
                    placeholder="000/000"
                    value={rtRw}
                    onChangeText={setRtRw}
                />

                <InputField
                    label="Lingkungan / Jaga"
                    placeholder="Masukkan Lingkungan / Jaga"
                    value={lingkungan}
                    onChangeText={setLingkungan}
                />

                <InputField
                    label="Kelurahan / Desa"
                    placeholder="Masukkan nama kelurahan / desa"
                    value={kelurahan}
                    onChangeText={setKelurahan}
                />

                <InputField
                    label="Kecamatan"
                    placeholder="Masukkan kecamatan"
                    value={kecamatan}
                    onChangeText={setKecamatan}
                />

                <InputField
                    label="Kabupaten / Kota"
                    placeholder="Masukkan Kabupaten / Kota"
                    value={kota}
                    onChangeText={setKota}
                />
            </ScrollView>

            <View className="border-t border-gray-200 bg-white p-4">
                <ButtonPrimary title="Selanjutnya" onPress={handleNext}/>
            </View>
        </View>
    )
}