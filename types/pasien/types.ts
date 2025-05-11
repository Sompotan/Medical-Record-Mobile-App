export type DetailRekamMedis = {
    tekananDarah: string;
    detakJantung: string;
    keluhan: string;
    diagnosis: string;
    deskripsiDiagnosis: string;
    resep: ResepItem[]
};

export type ResepItem = {
    nama: string;
    kekuatan: string;
    frekuensi: string;
}