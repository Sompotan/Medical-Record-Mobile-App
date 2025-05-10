import {Text, TextInput, View} from "react-native";


export type PemeriksaanPenunjangSectionProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function PemeriksaanPenunjangSection({value, onChange}: PemeriksaanPenunjangSectionProps) {
    return (
        <View className="mb-10 bg-white rounded-xl p-4 shadow-md">
            <Text className="font-medium text-xl mb-2">Pemeriksaan Penunjang</Text>
            <TextInput
                multiline
                textAlignVertical="top"
                placeholder="Masukkkan catatan pemeriksaan penunjang seperti hasil lab, radiologi, dsb..."
                className="border-b px-3 py-2 rounded-md text-sm bg-white"
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}