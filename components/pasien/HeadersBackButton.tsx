import {Text, TouchableOpacity, View} from "react-native";
import {Left} from "@/app/icons";
import {useRouter} from "expo-router";

type HeaderBackButtonProps = {
    title: string;
}

export default function HeadersBackButton({title}: HeaderBackButtonProps) {
    const router = useRouter();
    return (
        <View className="flex flex-row items-center gap-4 px-2">
            <TouchableOpacity
                onPress={() => router.back()}
            >
                <Left />
            </TouchableOpacity>
            <Text className="text-[20px] font-bold">{title}</Text>
        </View>
    )
}