import {useEffect, useState} from "react";
import {getStepDraft, saveStepDraft} from "@/services/formDraftService";
import {router} from "expo-router";
import {ScrollView, View} from "react-native";
import SelectField from "@/components/common/SelectField";
import {getStatusPembiayaanList} from "@/services/referenceService";
import InputField from "@/components/common/InputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {handleSubmitVerifikasi} from "@/services/verifikasiService";

export default function Step3() {
    const [statusPembiayaanId, setStatusPembiayaanId] = useState<number | null>(null);
    const [statusPembiayaanLabel, setStatusPembiayaanLabel] = useState<string>("");
    const [nomorPeserta, setNomorPeserta] = useState("");

    const [statusPembiayaanOption, setStatusPembiayaanOptions] = useState<{id: string; namaStatusPembiayaan: string }[]>([]);
    const [loadingStatusPembiayaan, setLoadingStatusPembiayaan] = useState<boolean>(true);

    useEffect(() => {
        const fetchStatusPembiayaan = async () => {
            try {
                const data = await getStatusPembiayaanList()
                setStatusPembiayaanOptions(data)
            } catch (error) {
                console.error("[Error Fetch Status Pembiayaan]", error)
            } finally {
                setLoadingStatusPembiayaan(false)
            }
        }

        const loadDraft = async () => {
            const draft = await getStepDraft(3);
            if (draft) {
                setStatusPembiayaanId(draft.statusPembiayaanId || null)
                setStatusPembiayaanLabel(draft.statusPembiayaanLabel || "")
                setNomorPeserta(draft.nomorPeserta || "");
            }
        }

        fetchStatusPembiayaan()
        loadDraft();

    }, []);

    useEffect(() => {
        saveStepDraft(3, {
            statusPembiayaanId,
            statusPembiayaanLabel,
            nomorPeserta
        })
    }, [statusPembiayaanId, statusPembiayaanLabel, nomorPeserta]);

    const isFormValid = () => {
        if (statusPembiayaanLabel === "BPJS") {
            return statusPembiayaanLabel && nomorPeserta.trim().length > 0;
        }
        return statusPembiayaanLabel !== "";
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                className="flex-1 px-6 pt-6"
                contentContainerStyle={{paddingBottom:20}}
            >
                <SelectField
                    label="Status Pembiayaan"
                    items={statusPembiayaanOption.map((item) => ({
                        label: item.namaStatusPembiayaan,
                        value: item.id
                    }))}
                    value={statusPembiayaanId}
                    onValueChange={(selectedId) => {
                        setStatusPembiayaanId(selectedId);

                        const selected = statusPembiayaanOption.find(item => item.id === selectedId);
                        setStatusPembiayaanLabel(selected?.namaStatusPembiayaan || "")
                    }}
                    placeholder="Pilih Status Pembiayaan"
                    disabled={loadingStatusPembiayaan}
                />

                {statusPembiayaanLabel === "BPJS" && (
                    <InputField
                        label="Nomor Peserta"
                        placeholder="Masukkan nomor peserta pembiayaan"
                        value={nomorPeserta}
                        onChangeText={setNomorPeserta}
                    />
                )}
            </ScrollView>
            <View className="border-t border-gray-200 bg-white p-4">
                <ButtonPrimary title="Kirim" onPress={handleSubmitVerifikasi} disabled={!isFormValid}/>
            </View>
        </View>
    )

}