export type FieldInputKey =
    | "keluhanUtama"
    | "keluhanTambahan"
    | "riwayatSekarang"
    | "riwayatDahulu"
    | "riwayatKeluarga"
    | "alergiObat"
    | "alergiMakanan"
    | "obatDikonsumsi";

export type SubjectiveNoteForm = Record<FieldInputKey, string>

export type SubjectiveNotePayload = {
    keluhanPasien: {deskripsi: string; jenis: string}[];
    riwayatPenyakit: {deskripsi: string; jenis: string}[];
    alergiPasien: {deskripsi: string; jenis: string}[];
    obatDikonsumsi: {deskripsi: string;}[];
}