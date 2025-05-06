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

export const getRekamMedis = async () => {
    const res = await API.get('/dokter/rekam-medis');
    return res.data;
}