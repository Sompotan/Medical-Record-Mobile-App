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
    keluhanPasien: {deskripsi: string; jenisKeluhan: string}[];
    riwayatPenyakit: {deskripsi: string; jenisRiwayat: string}[];
    alergiPasien: {deskripsi: string; jenisAlergi: string}[];
    obatDikonsumsi: {keterangan: string;}[];
}

export type ObjectiveNoteForm = {
    pemeriksaanUmum: {
        keadaanUmum: "Baik" | "Sedang" | "Lemah" | "";
        gcsEye: number;
        gcsVerbal: number;
        gcsMotor: number;
    };
    tandaVital: {
        tekananDarah: string;
        nadi: number;
        suhu: number;
        frekuensiNafas: number;
    };
    antropometri: {
        beratBadan: number;
        tinggiBadan: number;
        imt: number;
    };
    statusGeneralis: {
        kepalaLeher: string;
        thorax: string;
        abdomen: string;
        ekstremitas: string;
        lainnya: string;
    };
    pemeriksaanPenunjang: string;
};

export type ObjectiveFieldKey = keyof ObjectiveNoteForm

export type DiagnosisItem = {
    kodeKlinisId: string;
    jenis: "Utama" | "Banding" | "Lainnya";
    deskripsi: string;
}

export type AssessmentNoteForm = {
    diagnosis: DiagnosisItem[];
}

export type RencanaKlinisItem = {
    kodeKlinisId: string;
    jenisRencana: "Tindakan" | "Edukasi" | "Monitoring" | "Lainnya"
    jenisLayanan?: "KONTROL_ULANG" | "PENGOBATAN_JALAN" | "OBSERVASI" | "EDUKASI_PASIEN" | "TINDAKAN_RINGAN";
    tanggalRencana?: string;
    deskripsi: string;
}

export type PlanningNoteForm = {
    rencanaKlinis: RencanaKlinisItem[]
}