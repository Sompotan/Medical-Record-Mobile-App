import API from "@/services/api";

export const getProfileDokter = async () => {
    const res = await API.get('/dokter/profil');
    return res.data;
}

export const getRiwayatKunjunganDokter = async () => {
    const res = await API.get('/dokter/riwayat-kunjungan');
    return res.data;
}

export const getAntrian = async () => {
    const res = await API.get("/dokter/antrian");
    return res.data;
}

export const getAntrianById = async (id: string) => {
    const res = await API.get(`/dokter/kunjungan/${id}`)
    return res.data;
}

export const getRekamMedisById = async (id: string) => {
    const res = await API.get(`/dokter/rekam-medis/${id}`)
    return res.data;
}

export const getRekamMedisByPatientId = async (id:string) => {
    const res = await API.get(`/dokter/pasien/${id}/rekam-medis`);
    return res.data;
}

export const mulaiPemeriksaan = async (id: string) => {
    const res = await API.patch(`dokter/kunjugan/${id}/mulai-pemeriksaan`)
    return res.data;
}

export const getPasienInfo = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/pasien-info`)
    return res.data;
}