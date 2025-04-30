import {ReactNode} from "react";
import {TouchableOpacity, View, Text} from "react-native";

interface StepIndicatorItemProps {
    icon: ReactNode;
    label: string;
    isActive?: boolean;
    onPress?: () => void;
}

export default function StepIndicatorItem({ icon, label, isActive, onPress }: StepIndicatorItemProps) {
    return (
        <TouchableOpacity
            className={`flex-1 border p-2 items-center mx-1 rounded-md ${
                isActive ? "border-black" : "border-gray-300"
            }`}
            onPress={onPress}
            activeOpacity={1}
        >
            <View>{icon}</View>
            <Text className="text-sm mt-1">{label}</Text>
        </TouchableOpacity>
    )
}