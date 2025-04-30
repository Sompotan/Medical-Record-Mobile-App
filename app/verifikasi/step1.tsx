import {useEffect, useState} from "react";
import {router} from "expo-router";
import {getAgamaList, getPendidikanList, getStatusPerkawinanList} from "@/services/referenceService";
import {ScrollView, View} from "react-native";
import InputField from "@/components/common/InputField";
import {useAuth} from "@/hooks/useAuth";
import DatePickerField from "@/components/common/DatePickerField";
import SelectField from "@/components/common/SelectField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {getStepDraft, saveStepDraft} from "@/services/formDraftService";

export default function Step1() {
    const { user } = useAuth();

    const [nik, setNik] = useState<string>("");
    const [namaLengkap, setNamaLengkap] = useState<string>("");
    const [tanggalLahir, setTanggalLahir] = useState<Date | null>(null);
    const [nomorHandphone, setNomorHandphone] = useState<string>("");
    const [jenisKelamin, setJenisKelamin] = useState<string>("");
    const [agamaId, setAgamaId] = useState<number | null>(null);
    const [agamaLabel, setAgamaLabel] = useState<string>("");
    const [pendidikanId, setPendidikanId] = useState<number | null>(null);
    const [pendidikanLabel, setPendidikanLabel] = useState<string>("");
    const [statusPerkawinanId, setStatusPerkawinanId] = useState<number | null>(null);
    const [statusPerkawinanLabel, setStatusPerkawinanLabel] = useState<string>("");
    const [pekerjaan, setPekerjaan] = useState<string>("");

    const [agamaOptions, setAgamaOptions] = useState<{id: string; namaAgama: string }[]>([]);
    const [pendidikanOption, setPendidikanOptions] = useState<{id: string; namaPendidikan: string }[]>([]);
    const [statusPerkawinanOption, setStatusPerkawinanOptions] = useState<{id: string; namaStatusPerkawinan: string }[]>([]);
    const [loadingAgama, setLoadingAgama] = useState<boolean>(true);
    const [loadingPendidikan, setLoadingPendidikan] = useState<boolean>(true);
    const [loadingStatusPerkawinan, setLoadingStatusPerkawinan] = useState<boolean>(true);

    useEffect(() => {
        const fetchAgama = async () => {
            try{
                const data = await getAgamaList()
                setAgamaOptions(data);
            } catch (error) {
                console.error("[Error Fetch Agama]", error);
            } finally {
                setLoadingAgama(false);
            }
        }

        const fetchPendidikan = async () => {
            try{
                const data = await getPendidikanList()
                setPendidikanOptions(data);
            } catch (error) {
                console.error("[Error Fetch Pendidikan]", error);
            } finally {
                setLoadingPendidikan(false);
            }
        }

        const fetchStatusPerkawinan = async () => {
            try {
                const data = await getStatusPerkawinanList()
                setStatusPerkawinanOptions(data);
            } catch (error) {
                console.error("[Error Fetch StatusPerkawinan]", error);
            } finally {
                setLoadingStatusPerkawinan(false);
            }
        }

        const loadDraft = async () => {
            const draft = await getStepDraft(1);
            if (draft) {
                setNik(draft.nik || "");
                setNamaLengkap(draft.namaLengkap || "");
                setTanggalLahir(draft.tanggalLahir ? new Date(draft.tanggalLahir) : null);
                setNomorHandphone(draft.nomorHandphone || "");
                setJenisKelamin(draft.jenisKelamin || "");
                setAgamaId(draft.agamaId || null);
                setAgamaLabel(draft.agamaLabel || "");
                setPendidikanId(draft.pendidikanId || null);
                setPendidikanLabel(draft.pendidikanLabel || "");
                setStatusPerkawinanId(draft.statusPerkawinanId || null);
                setStatusPerkawinanLabel(draft.statusPerkawinanLabel || "")
                setPekerjaan(draft.pekerjaan || "");
            }
        }

        fetchAgama();
        fetchPendidikan();
        fetchStatusPerkawinan();
        loadDraft();
    }, []);

    const saveDraft = async () => {
        await saveStepDraft(1, {
            nik,
            namaLengkap,
            tanggalLahir: tanggalLahir ? tanggalLahir.toISOString() : null,
            nomorHandphone,
            jenisKelamin,
            agamaId,
            agamaLabel,
            pendidikanId,
            pendidikanLabel,
            statusPerkawinanId,
            statusPerkawinanLabel,
            pekerjaan
        })
    }

    useEffect(() => {
        saveDraft()
    }, [
        nik,
        namaLengkap,
        tanggalLahir,
        nomorHandphone,
        jenisKelamin,
        agamaId,
        agamaLabel,
        pendidikanId,
        pendidikanLabel,
        statusPerkawinanId,
        statusPerkawinanLabel,
        pekerjaan
    ]);

    const handleNext = () => {
        router.push("/verifikasi/step2")
    }


    return (
        <View className="flex-1 bg-white">
            <ScrollView className="flex-1 p-6" contentContainerStyle={{
                paddingBottom: 20
            }}>
                <InputField
                    label="NIK"
                    placeholder="Masukkan NIK anda"
                    value={nik}
                    onChangeText={setNik}
                    keyboardType="numeric"
                />

                <InputField
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap anda"
                    value={namaLengkap}
                    onChangeText={setNamaLengkap}
                />

                <DatePickerField
                    label="Tanggal Lahir"
                    value={tanggalLahir}
                    onChange={setTanggalLahir}
                />

                <InputField
                    label="Nomor Handphone"
                    placeholder="Masukkan nomor handphone anda"
                    value={nomorHandphone}
                    onChangeText={setNomorHandphone}
                    keyboardType="phone-pad"
                />

                <SelectField
                    label="Jenis Kelamin"
                    items={[
                        {label: "Laki - Laki", value: "Pria"},
                        {label: "Perempuan", value: "Wanita"}
                    ]}
                    value={jenisKelamin}
                    onValueChange={setJenisKelamin}
                    placeholder="Pilih Jenis Kelamin"
                />

                <SelectField
                    label="Agama"
                    items={agamaOptions.map((item) => ({
                        label: item.namaAgama,
                        value: item.id,
                    }))}
                    value={agamaId}
                    onValueChange={(selectedId) => {
                        setAgamaId(selectedId);

                        const selected = agamaOptions.find(item => item.id === selectedId);
                        setAgamaLabel(selected?.namaAgama || "")

                    }}
                    placeholder="Pilih Agama"
                    disabled={loadingAgama}
                />

                <SelectField
                    label="Pendidikan Terakhir"
                    items={pendidikanOption.map((item) => ({
                        label: item.namaPendidikan,
                        value: item.id,
                    }))}
                    value={pendidikanId}
                    onValueChange={(selectedId) => {
                        setPendidikanId(selectedId);

                        const selected = pendidikanOption.find(item => item.id === selectedId);
                        setPendidikanLabel(selected?.namaPendidikan || "")
                    }}
                    placeholder="Pilih Pendidikan terakhir"
                    disabled={loadingPendidikan}
                />

                <SelectField
                    label="Status Perkawinan"
                    items={statusPerkawinanOption.map((item) => ({
                        label: item.namaStatusPerkawinan,
                        value: item.id,
                    }))}
                    value={statusPerkawinanId}
                    onValueChange={(selectedId) => {
                        setStatusPerkawinanId(selectedId);

                        const selected = statusPerkawinanOption.find(item => item.id === selectedId);
                        setStatusPerkawinanLabel(selected?.namaStatusPerkawinan || "")
                    }}
                    placeholder="Pilih Status Perkawinan anda"
                    disabled={loadingStatusPerkawinan}
                />

                <InputField
                    label="Pekerjaan"
                    placeholder="Masukkan pekerjaan anda"
                    value={pekerjaan}
                    onChangeText={setPekerjaan}
                />

            </ScrollView>
            <View className="border-t border-gray-200 bg-white p-4">
                <ButtonPrimary
                    title="Selanjutnya"
                    onPress={handleNext}
                />
            </View>
        </View>

    )
}