import {View, Text, TextInput} from "react-native";

export type TextInputFieldProps = {
    label: string;
    placeholder: string;
    onChange: (text: string) => void;
    value: string;
}

export default function TextInputField({label, placeholder, onChange, value} : TextInputFieldProps) {
    return (
        <View className="mb-4">
            <Text className="font-medium text-base mb-1">{label}</Text>
            <TextInput
                multiline
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                textAlignVertical="top"
                className="border border-gray-300 rounded-lg p-3 text-sm bg-white h-[80px]"
            />
        </View>
    )
}