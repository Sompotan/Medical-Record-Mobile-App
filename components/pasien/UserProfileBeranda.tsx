import {Image, View, Text} from "react-native";
import {MaleUser} from "@/assets";

export default function UserProfileBeranda() {
    return(
        <View className="flex flex-row items-center justify-start gap-2 ">
            <MaleUser  />
            <Text>Halo, John Doe</Text>
        </View>
    )
}