import {JenisLayanan, JenisRencana} from "@/types/rekam-medis/types";

export const JENIS_RENCANA_OPTIONS: { label: string; value: JenisRencana }[] = [
    { label: "Pengobatan", value: "Tindakan" },
    { label: "Edukasi", value: "Edukasi" },
    { label: "Monitoring", value: "Monitoring" },
    { label: "Lainnya", value: "Lainnya" }
]

export const JENIS_LAYANAN_OPTIONS : {label: string; value: JenisLayanan}[] = [
    { label: "Kontrol Ulang", value: "KONTROL_ULANG" },
    { label: "Pengobatan Jalan", value: "PENGOBATAN_JALAN" },
    { label: "Observasi", value: "OBSERVASI" },
    { label: "Edukasi Pasien", value: "EDUKASI_PASIEN" },
    { label: "Tindakan Ringan", value: "TINDAKAN_RINGAN" },
]