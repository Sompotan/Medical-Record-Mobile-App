import api from "@/services/api";

export const getRiwayatKunjungan = async () => {
    const res = await api.get("/pasien/kunjungan");
    return res.data;
}