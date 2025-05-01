import {View, Text} from "react-native";


type CardProfileInfoItemProps = {
    title: string;
    value: string;
}

export default function CardProfileInfoItem({title, value}: CardProfileInfoItemProps) {
    return(
        <View className="flex flex-col gap-1">
            <Text className="text-[#8f8f8f]">{title}</Text>
            <Text className="font-semibold text-lg">{value}</Text>
        </View>
    )
}