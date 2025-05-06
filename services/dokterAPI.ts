import API from "@/services/api";

export const getProfileDokter = async () => {
    const res = await API.get('/dokter/profil');
    return res.data;
}

export const getRiwayatKunjunganDokter = async () => {
    const res = await API.get('/dokter/riwayat-kunjungan');
    return res.data;
}