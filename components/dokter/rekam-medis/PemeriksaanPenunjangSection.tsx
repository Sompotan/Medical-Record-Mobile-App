import {Text, TextInput, View} from "react-native";


export type PemeriksaanPenunjangSectionProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function PemeriksaanPenunjangSection({value, onChange}: PemeriksaanPenunjangSectionProps) {
    return (
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Pemeriksaan Penunjang</Text>
            <TextInput
                multiline
                textAlignVertical="top"
                placeholder="Masukkkan catatan pemeriksaan penunjang seperti hasil lab, radiologi, dsb..."
                className="h-[120px] border px-3 py-2 rounded-md text-sm bg-white"
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}