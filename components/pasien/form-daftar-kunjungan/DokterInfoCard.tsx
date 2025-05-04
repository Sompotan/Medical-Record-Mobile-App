import {Text, View, Image} from "react-native";
import {User} from "lucide-react-native";

export type DokterInfoCardProps = {
    namaLengkap: string;
    fotoProfil?: string;
}


export default function DokterInfoCard({namaLengkap, fotoProfil}: DokterInfoCardProps) {
    return (
        <View className="mt-3 p-4 flex flex-row items-center justify-between bg-white rounded-lg mb-8">
            <View className="flex flex-row gap-6 items-center justify-start">
                {fotoProfil ? (
                    <Image
                        source={{uri: fotoProfil}}
                        className="w-16 h-16 rounded-full"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-16 h-16 rounded-full bg-gray-200 justify-center items-center">
                        <User size={32} color="#aaa" />
                    </View>
                )}
                <Text className="font-semibold">{namaLengkap}</Text>
            </View>
        </View>
    )
}