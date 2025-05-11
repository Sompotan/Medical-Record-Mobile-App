import keywords from "ajv-keywords/src/keywords";

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

export type ResepObatItem = {
    obatId: string;
    frekuensi: string;
    durasi: string;
    aturan_pakai: string;
    catatan?: string;
}

export type RencanaEntry = {
    kodeKlinisId?: string;
    jenisRencana: JenisRencana;
    jenisLayanan: JenisLayanan;
    deskripsi : string;
    tanggalRencana?: string;
    resepObat?: ResepObatItem[]
}

export type JenisLayanan =
    | "KONTROL_ULANG"
    | "PENGOBATAN_JALAN"
    | "OBSERVASI"
    | "EDUKASI_PASIEN"
    | "TINDAKAN_RINGAN"
    | "";

export type JenisLayananSelectProps = {
    value: JenisLayanan | undefined;
    onChange: (val: JenisLayanan) => void;
}

export type JenisRencana = "Tindakan" | "Monitoring" | "Edukasi" | "Lainnya"

export type JenisRencanaSelectProps = {
    value: JenisRencana | undefined;
    onChange: (val: JenisRencana) => void;
}

export type TanggalMonitoringPickerProps = {
    value: Date | null;
    onChange: (date: Date) => void;
    allowedDays: string[];
}

export type ObatOption = {
    id: string;
    label: string;
}

export type ResepObatFormProps = {
    value: ResepObatItem[];
    onChange: (list: ResepObatItem[]) => void;
    obatOptions: ObatOption[]
    onSearch: (keyword: string) => void;
}

export type DeskripsiInputProps = {
    value: string;
    onChange: (text: string) => void;
}

export type RencanaItemCardProps = {
    item: RencanaEntry
    index: number
    onRemove: (index: number) => void;
    getObatLabelById?: (id: string) => string;
}

export type GetPlanningNoteResponse = {
    message: string;
    rencanaKlinis: RencanaEntry[];
}

export type RekamMedisItem = {
    id: string;
    tanggal: string;
    dokter: string;
    versi: "UTAMA" | "REVISI";
    diagnosis: string;
    kunjunganId: string;
}