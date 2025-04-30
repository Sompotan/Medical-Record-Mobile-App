import {clearStepDraft, getStepDraft} from "@/services/formDraftService";
import * as SecureStore from "expo-secure-store";
import api from "@/services/api";
import {Alert} from "react-native";
import {router} from "expo-router";

export const submitVerifikasiPasien = async () => {
    try {
        const step1 = await getStepDraft(1)
        const step2 = await getStepDraft(2)
        const step3 = await getStepDraft(3)
        const token = await SecureStore.getItemAsync("token");

        if (!step1 || !step2 || !step3 || !token) {
            throw new Error("Data tidak lengkap")
        }

        const responseJenisIdentifier = await api.get('/jenis-identifiers')
        const jenisIdentifiers = responseJenisIdentifier.data;

        const nikIdentifier = jenisIdentifiers.find((item: any) => item.namaJenisIdentifier === "NIK")
        const bpjsIdentifier = jenisIdentifiers.find((item: any) => item.namaJenisIdentifier === "Nomor BPJS")

        console.log("[DEBUG NIK DAN BPJS]", nikIdentifier, bpjsIdentifier)


        if (!nikIdentifier) {
            throw new Error("Jenis Identifier NIK tidak ditemukan dalam database")
        }

        if (!bpjsIdentifier) {
            throw new Error("Jenis Identifier BPJS tidak ditemukan dalam database")
        }

        const identifiers = [
            {
                id_jenis_identifier: nikIdentifier.id,
                nilai_identifier: step1.nik,
                use: "Official"
            }
        ]

        if (step3.statusPembiayaanLabel === "BPJS") {
            identifiers.push({
                id_jenis_identifier: bpjsIdentifier.id,
                nilai_identifier: step3.nomorPeserta,
                use: "Secondary"
            })
        }

        const payload = {
            nama_lengkap: step1.namaLengkap,
            nomor_handphone: step1.nomorHandphone,
            pekerjaan: step1.pekerjaan,
            tanggal_lahir: step1.tanggalLahir ? new Date(step1.tanggalLahir) : null,
            gender: step1.jenisKelamin,
            id_status_perkawinan: step1.statusPerkawinanId,
            id_pendidikan: step1.pendidikanId,
            id_agama: step1.agamaId,
            id_status_pembiayaan: step3.statusPembiayaanId,

            identifiers: identifiers,

            alamat: {
                jalan: step2.jalan,
                rt_rw: step2.rtRw,
                lingkungan: step2.lingkungan,
                kelurahan_desa: step2.kelurahan,
                kecamatan: step2.kecamatan,
                kabupaten_kota: step2.kota
            }

        }

        console.log("[DEBUG] Payload Submit Verifikasi:", JSON.stringify(payload, null, 2));

        const response = await api.post("/pasien/ajukan-verifikasi", payload, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })

        await clearStepDraft(1);
        await clearStepDraft(2);
        await clearStepDraft(3);

        return response.data
    } catch (error) {
        console.error("[Submit Verifikasi Error]", error)
        throw new Error("Terjadi Kesalahan Saat Submit Verifikasi.")
    }
}

export const handleSubmitVerifikasi = async () => {
    try {
        const data = await submitVerifikasiPasien();
        Alert.alert("Sukses", data.message || "Data berhasil diajukan")
        router.replace("/pasien")
    } catch (error: any) {
        Alert.alert("Gagal", error.message);
    }
}