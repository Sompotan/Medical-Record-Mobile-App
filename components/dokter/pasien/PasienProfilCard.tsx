import {PasienProfileCardProps} from "@/types/dokter/types";
import {Image, View, Text} from "react-native";
import {User} from "lucide-react-native";

export default function PasienProfilCard({
                                             namaLengkap,
                                             medicalRecordNumber,
                                             tanggalLahir,
                                             gender,
                                             fotoProfil,
                                         }: PasienProfileCardProps) {
    return (
        <View className="bg-white rounded-xl p-4 flex-row items-center">
            {fotoProfil ? (
                <Image
                    source={{ uri: fotoProfil }}
                    className="w-12 h-12 rounded-full mr-4"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center mr-4">
                    <User size={24} color="#aaa" />
                </View>
            )}
            <View className="flex-1">
                <Text className="font-bold text-lg">{namaLengkap}</Text>
                <Text className="text-sm text-gray-500">MRN : {medicalRecordNumber}</Text>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-sm text-gray-500">Tanggal Lahir{"\n"}<Text className="text-black font-semibold">{tanggalLahir}</Text></Text>
                    <Text className="text-sm text-gray-500">Gender{"\n"}<Text className="text-black font-semibold">{gender}</Text></Text>
                </View>
            </View>
        </View>
    )
}