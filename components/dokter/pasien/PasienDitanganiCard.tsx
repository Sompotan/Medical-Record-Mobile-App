import {PasienDitanganiProps} from "@/types/dokter/types";
import {Image, TouchableOpacity, View, Text} from "react-native";
import {User} from "lucide-react-native";

export default function PasienDitanganiCard({nama, mrn, fotoProfil, onPress} : PasienDitanganiProps) {
    return (
        <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center mb-3"
            onPress={onPress}
        >
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
                <Text className="font-semibold text-base">{nama}</Text>
                <Text className="text-sm text-gray-600">MRN : {mrn}</Text>
            </View>
            <Text className="text-sm font-medium text-gray-600">Lihat Detail &gt;</Text>

        </TouchableOpacity>
    )
}