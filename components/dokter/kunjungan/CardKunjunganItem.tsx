import {Image, Text, TouchableOpacity, View} from "react-native";
import {User} from "lucide-react-native";

export type CardKunjunganItemProps = {
    id: string;
    fotoProfil?: string;
    nama_pasien: string;
    alasan_kunjungan: string;
    onPress?: () => void;
}

export default function CardKunjunganItem({id, fotoProfil, nama_pasien, alasan_kunjungan, onPress}: CardKunjunganItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View className="flex flex-row items-center gap-4 bg-white rounded-lg p-3">
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
                    <Text className="text-[12px] ">Keluhan : {alasan_kunjungan}</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}