export type PasienDitangani = {
    id: string;
    nama: string;
    mrn: string;
    fotoProfil: string | null;
}

export type PasienDitanganiProps = PasienDitangani & {
    onPress: () => void;
}

export type RekamMedisRiwayat = {
    id: string;
    tanggal: string;
    diagnosis: string;
    dokter: string;
}


export type DetailPasienWithRiwayat = {
    pasien: PasienProfileCardProps
    rekamMedis: RekamMedisRiwayat[];
}

export type PasienProfileCardProps = {
    namaLengkap: string;
    medicalRecordNumber: string;
    tanggalLahir: string;
    gender: string;
    fotoProfil?: string;
}

export type RiwayatRekamMedisCardProps = {
    id: string;
    diagnosis: string;
    dokter: string;
    tanggal: string;
    onPress: () => void;
}