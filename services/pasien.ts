import api from "@/services/api";

export const getRiwayatKunjungan = async () => {
    const res = await api.get("/pasien/kunjungan");
    return res.data;
}

export const getProfilePasien = async () => {
    const res = await api.get('/pasien/profil');
    return res.data;
}