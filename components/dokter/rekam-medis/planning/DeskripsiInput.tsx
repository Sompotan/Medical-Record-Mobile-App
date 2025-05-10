import {DeskripsiInputProps} from "@/types/rekam-medis/types";
import {Text, TextInput, View} from "react-native";

export default function DeskripsiInput({value, onChange}: DeskripsiInputProps) {
    return (
        <View className="mt-4">
            <Text className="font-medium mb-1">Deskripsi Rencana</Text>
            <TextInput
                placeholder="Masukkan deskripsi rencana klinis..."
                value={value}
                onChangeText={onChange}
                multiline
                textAlignVertical="top"
                className="border rounded-md px-3 py-2 bg-white text-sm h-24"
            />
        </View>
    )
}