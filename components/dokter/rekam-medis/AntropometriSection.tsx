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
        <View className="mb-6 bg-white rounded-xl p-4">
            <Text className="font-medium text-xl mb-2">Antropometri</Text>

            <View className="p-2 rounded-lg space-y-3 gap-3">
                <View className="flex-row justify-between space-x-4">
                    <View className="flex-1">
                        <Text className="text-sm">Berat Badan</Text>
                        <View className="flex flex-row items-center">
                            <TextInput
                                placeholder="0"
                                keyboardType="numeric"
                                value={form.beratBadan.toString()}
                                onChangeText={(v) => onChange("beratBadan", v === "" ? 0 : parseFloat(v))}
                                className={`${form.beratBadan.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.beratBadan.toString() ? "text-black" : "text-gray-300"}`}>Kg</Text>
                        </View>

                    </View>
                    <View className="flex-1">
                        <Text className="text-sm">Tinggi Badan</Text>
                        <View className="flex flex-row items-center">
                            <TextInput
                                placeholder="___ cm"
                                keyboardType="numeric"
                                value={form.tinggiBadan.toString()}
                                onChangeText={(v) => onChange("tinggiBadan", v === "" ? 0 : parseFloat(v))}
                                className={`${form.tinggiBadan.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.tinggiBadan.toString() ? "text-black" : "text-gray-300"}`}>cm</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Text>IMT (BB/TB²)</Text>
                    <TextInput
                        placeholder="___"
                        keyboardType="numeric"
                        value={form.imt.toString()}
                        onChangeText={(v) => onChange("imt", v === "" ? 0 : parseFloat(v))}
                        className={`${form.imt.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                    />
                </View>
            </View>

        </View>
    )
}