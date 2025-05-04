import {Text, TextInput} from "react-native";

type ReasonInputProps = {
    value: string;
    onChange: (text: string) => void;
}


export default function ReasonInput({value, onChange}: ReasonInputProps){
    return (
        <>
            <Text className="mt-8 font-bold text-[20px] mb-4">
                Alasan Kunjungan
            </Text>
            <TextInput
                className="bg-white h-[100px] p-3 rounded-md text-gray-800 mb-auto"
                placeholder="Tulis alasan kenapa melakukan kunjungan ini"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
            />
        </>
    )
}