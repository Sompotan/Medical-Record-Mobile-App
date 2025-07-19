import API from "@/services/api";
import {RekamMedisItem} from "@/types/rekam-medis/types";

export const getRiwayatKunjungan = async () => {
    const res = await API.get("/pasien/kunjungan");
    return res.data;
}

export const getProfilePasien = async () => {
    const res = await API.get('/pasien/profil');
    return res.data;
}

export const getDokterList = async() => {
    const res = await API.get("/dokter");
    return res.data;
}

export const getJadwalPraktekDokter = async (id: string) => {
    const res = await API.get(`/pasien/dokter/${id}/jadwal-praktek`)
    return res.data;
}

export const daftarKunjungan = async (data: {
    tenagaMedisId: string;
    tanggal_kunjungan: string;
    alasanKunjungan: string;
}) => {
    const res = await API.post(`/pasien/kunjungan`, data);
    return res.data;
}

export const getRekamMedis = async () : Promise<RekamMedisItem[]> =>  {
    const res = await API.get("/pasien/rekam-medis");
    return res.data;
}

export const getRekamMedisById = async (id: string) => {
    const res = await API.get(`/pasien/rekam-medis/${id}`)
    return res.data;
}

export const getStatusVerifikasi = async () => {
    const res = await API.get("/pasien/verifikasi-status");
    return res.data;
};