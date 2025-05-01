import {Image, TouchableOpacity, View} from "react-native";
import {MaleUserOutline} from "@/app/icons";
import {Unsplash} from "@/assets";
import {Camera, User} from "lucide-react-native";

type AvatarUploadProps = {
    fotoProfil?: string | null;
}

export default function AvatarUpload({fotoProfil}: AvatarUploadProps){
    return (
        <View className="w-32 h-32 rounded-full border border-gray-300 justify-center items-center relative bg-white">
            {/* Icon placeholder */}
            {fotoProfil ? (
                <Image
                    source={{ uri: fotoProfil }}
                    className="w-32 h-32 rounded-full"
                    resizeMode="cover"
                />
            ) : (
                <View className="w-32 h-32 rounded-full bg-gray-200 justify-center items-center">
                    <User size={64} color="#aaa" />
                </View>
            )}


            {/* Tombol kamera di pojok kanan bawah */}
            <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-300 rounded-full p-2">
                <Camera size={16} color="#000" />
            </TouchableOpacity>
        </View>
    );
}