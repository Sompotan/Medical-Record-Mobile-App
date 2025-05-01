import {Image, View, Text} from "react-native";
import {MaleUser} from "@/assets";
import {User} from "lucide-react-native";

type UserProfileBerandaProps = {
    name?: string;
    image?: string | null;
}

export default function UserProfileBeranda({name, image}: UserProfileBerandaProps) {
    return(
        <View className="flex flex-row items-center justify-start gap-2 ">
            {image ? (
                <Image
                    source={{ uri: image }}
                    className="w-[40px] h-[40px] rounded-full"
                    resizeMode="cover"
                />
            ) : (
                <MaleUser  />
            )}


            <Text>Halo, {name ? name : "Selamat Datang"}</Text>
        </View>
    )
}