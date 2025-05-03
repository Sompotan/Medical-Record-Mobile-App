import {Image, View, Text, TouchableOpacity} from "react-native";
import {User, ArrowRight} from "lucide-react-native";
import {useRouter} from "expo-router";

export type ListItemDokterProps = {
    id: string;
    namaLengkap: string;
    foto_profil?: string;
    path?: string | undefined;
}

export default function ListItemDokter({foto_profil, namaLengkap , path}: ListItemDokterProps) {
    const router = useRouter()

    return (
        <TouchableOpacity onPress={() => router.push(path)}>
            <View className="p-4 flex flex-row items-center justify-between bg-white rounded-lg mb-4">
                <View className="flex flex-row gap-6 items-center justify-start">
                    {foto_profil ? (
                        <Image
                            source={{ uri: foto_profil }}
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
                <ArrowRight size={24} color="black" />
            </View>
        </TouchableOpacity>

    )
}