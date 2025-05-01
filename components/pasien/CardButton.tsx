import {TouchableOpacity, Text, View} from "react-native";
import React from "react";
import {useRouter} from "expo-router";

type CardButtonProps = {
    title: string;
    path?: string;
    icon: React.ReactNode;
}

export default function CardButton({title, icon, path} : CardButtonProps) {
    const router = useRouter();

    return(
        <TouchableOpacity
            className="flex-1 bg-white p-4 rounded-lg items-start gap-2"
            onPress={() => router.push(path as any)}
        >
            <View>{icon}</View>
            <Text>{title}</Text>

        </TouchableOpacity>
    )
}