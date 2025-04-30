import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";

interface SelectFieldProps {
    label: string;
    items: { label: string; value: any }[];
    value: any
    onValueChange: (value: any) => void;
    placeholder?: string;
    disabled?: boolean;
}

export default function SelectField({
    label,
    items,
    value,
    onValueChange,
    placeholder = "Pilih salah satu",
    disabled = false
}: SelectFieldProps)  {
    return (
        <View className="mb-4">
            <Text className="mb-2 font-semibold text-gray-700">{label}</Text>
            <View className="border rounded-md">
                <RNPickerSelect
                    placeholder={{ label: placeholder, value: null }}
                    onValueChange={onValueChange}
                    items={items}
                    value={value}
                    disabled={disabled}
                    style={{
                        inputIOS: {
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            color: "#374151", // text-gray-700
                            fontSize: 16,
                        },
                        inputAndroid: {
                            paddingVertical: 12,
                            paddingHorizontal: 16,
                            color: "#374151",
                            fontSize: 16,
                        },
                        placeholder: {
                            color: "#9CA3AF", // text-gray-400
                        },
                    }}
                    useNativeAndroidPickerStyle={false}
                />
            </View>
        </View>
    )
}