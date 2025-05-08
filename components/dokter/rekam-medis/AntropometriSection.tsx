import {View, Text, TextInput} from "react-native";


export type AntropometriSectionProps = {
    form: {
        beratBadan: number;
        tinggiBadan: number;
        imt: number;
    }
    onChange: (field: keyof AntropometriSectionProps["form"], value: any ) => void;
}


export default function AntropometriSection({form, onChange}: AntropometriSectionProps) {
    return (
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Antropometri</Text>

            <View className="border p-4 rounded-lg space-y-3">
                <View className="flex-row justify-between space-x-4">
                    <View className="flex-1">
                        <Text className="text-sm">Berat Badan</Text>
                        <TextInput
                            placeholder="___ Kg"
                            keyboardType="numeric"
                            value={form.beratBadan.toString()}
                            onChangeText={(v) => onChange("beratBadan", parseFloat(v || "0"))}
                            className="border px-2 py-1 rounded-md mt-1"
                        />
                    </View>
                    <View className="flex-1">
                        <Text className="text-sm">Tinggi Badan</Text>
                        <TextInput
                            placeholder="___ cm"
                            keyboardType="numeric"
                            value={form.tinggiBadan.toString()}
                            onChangeText={(v) => onChange("tinggiBadan", parseFloat(v || "0"))}
                            className="border px-2 py-1 rounded-md mt-1"
                        />
                    </View>
                </View>
                <View>
                    <Text>IMT (BB/TB²)</Text>
                    <TextInput
                        placeholder="___"
                        keyboardType="numeric"
                        value={form.imt.toString()}
                        onChangeText={(v) => onChange("imt", parseFloat(v || "0"))}
                        className="border px-2 py-1 rounded-md mt-1"
                    />
                </View>
            </View>

        </View>
    )
}