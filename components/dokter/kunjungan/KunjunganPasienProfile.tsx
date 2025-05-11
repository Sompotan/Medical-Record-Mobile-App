import {Image, Text, View} from "react-native";
import {User} from "lucide-react-native";

export type KunjunganPasienProfileProps = {
    fotoProfil?: string;
    nama_pasien?: string;
    medicalRecordNumber?: string;
    tanggal_lahir?: string;
    gender?: string;
    alasan_kunjungan?: string;
    status?: string;
}

export default function KunjunganPasienProfile({
       fotoProfil,
       nama_pasien,
       medicalRecordNumber,
       tanggal_lahir,
       alasan_kunjungan,
       gender
   }: KunjunganPasienProfileProps) {
    return (
        <View className="bg-white rounded-lg p-6 gap-5">
            <View className="flex flex-row items-center gap-4">
                {fotoProfil ? (
                    <Image
                        source={{ uri: fotoProfil }}
                        className="w-32 h-32 rounded-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-[68px] h-[68px] rounded-full bg-gray-200 justify-center items-center">
                        <User size={34} color="#aaa" />
                    </View>
                )}
                <View className="flex flex-col">
                    <Text className="text-2xl font-semibold">{nama_pasien}</Text>
                    <Text className="text-[12px] ">MRN : {medicalRecordNumber}</Text>
                </View>
            </View>
            <View className="flex flex-row items-center justify-between">
                <View className="flex flex-col items-start">
                    <Text className="font-semibold text-[#5f5f5f]">Tanggal Lahir</Text>
                    <Text className="font-semibold ">{tanggal_lahir}</Text>
                </View>
                <View className="flex flex-col items-start">
                    <Text className="font-semibold text-[#5f5f5f]">Jenis Kelamin</Text>
                    <Text className="font-semibold ">{gender === "Pria" ? "Laki - Laki" : gender === "Wanita" ? "Perempuan" : "-"}</Text>
                </View>
            </View>
            <View className="flex flex-col gap-1">
                <Text className="text-[22px] font-semibold">Alasan Kunjungan</Text>
                <Text className="">{alasan_kunjungan}</Text>
            </View>
        </View>
    )
}