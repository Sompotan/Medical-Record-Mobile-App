import {Text, TouchableOpacity, View} from "react-native";
import {Left} from "@/app/icons";
import {useRouter} from "expo-router";

type HeaderBackButtonProps = {
    title: string;
    onPress?: string;
}

export default function HeadersBackButton({title, onPress}: HeaderBackButtonProps) {
    const router = useRouter();

    return (
        <View className="flex flex-row items-center gap-4 px-2">
            <TouchableOpacity
                // @ts-ignore
                onPress={onPress ? () => router.replace(onPress) :  () => router.back()}
            >
                <Left />
            </TouchableOpacity>
            <Text className="text-[20px] font-bold">{title}</Text>
        </View>
    )
}