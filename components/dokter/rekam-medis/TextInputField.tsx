import { View, Text, TextInput } from "react-native";

export type TextInputFieldProps = {
    label: string;
    placeholder: string;
    onChange: (text: string) => void;
    value: string;
    readonly?: boolean;
};

export default function TextInputField({
                                           label,
                                           placeholder,
                                           onChange,
                                           value,
                                           readonly = false,
                                       }: TextInputFieldProps) {
    return (
        <View className="mb-4 bg-white p-4 rounded-xl shadow-md">
            <Text className="font-medium text-base mb-1">{label}</Text>
            <TextInput
                multiline
                editable={!readonly}
                selectTextOnFocus={!readonly}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                textAlignVertical="top"
                className={`${
                    value ? "border-b border-black" : "border-b border-gray-300"
                } p-3 text-sm bg-white ${readonly ? "text-gray-500" : ""}`}
            />
        </View>
    );
}
