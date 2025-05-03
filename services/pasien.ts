import API from "@/services/api";

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