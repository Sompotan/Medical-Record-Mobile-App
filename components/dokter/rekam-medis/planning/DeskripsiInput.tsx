import { DeskripsiInputProps } from "@/types/rekam-medis/types";
import { Text, TextInput, View } from "react-native";

type Props = DeskripsiInputProps & {
    disabled?: boolean;
};

export default function DeskripsiInput({ value, onChange, disabled = false }: Props) {
    return (
        <View className="mt-4">
            <Text className="font-medium mb-1">Deskripsi Rencana</Text>
            <TextInput
                placeholder="Masukkan deskripsi rencana klinis..."
                value={value}
                onChangeText={onChange}
                editable={!disabled}
                multiline
                textAlignVertical="top"
                className={`rounded-xl px-3 py-2 bg-white shadow-md text-sm h-24 ${
                    disabled ? "opacity-50" : ""
                }`}
            />
        </View>
    );
}
