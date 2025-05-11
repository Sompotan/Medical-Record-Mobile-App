import { View, Text, TextInput } from "react-native";

export type AntropometriSectionProps = {
    form: {
        beratBadan: number;
        tinggiBadan: number;
        imt: number;
    };
    onChange: (field: keyof AntropometriSectionProps["form"], value: any) => void;
    readonly?: boolean;
};

export default function AntropometriSection({ form, onChange, readonly = false }: AntropometriSectionProps) {
    return (
        <View className="mb-6 bg-white rounded-xl p-4 shadow-md">
            <Text className="font-medium text-xl mb-2">Antropometri</Text>

            <View className="p-2 rounded-lg space-y-3 gap-3">
                <View className="flex-row justify-between space-x-4">
                    {/* Berat Badan */}
                    <View className="flex-1">
                        <Text className="text-sm">Berat Badan</Text>
                        <View className="flex flex-row items-center">
                            <TextInput
                                editable={!readonly}
                                placeholder="0"
                                keyboardType="numeric"
                                value={form.beratBadan.toString()}
                                onChangeText={(v) => onChange("beratBadan", v === "" ? 0 : parseFloat(v))}
                                className={`${
                                    form.beratBadan.toString() ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.beratBadan ? "text-black" : "text-gray-300"}`}>Kg</Text>
                        </View>
                    </View>

                    {/* Tinggi Badan */}
                    <View className="flex-1">
                        <Text className="text-sm">Tinggi Badan</Text>
                        <View className="flex flex-row items-center">
                            <TextInput
                                editable={!readonly}
                                placeholder="___ cm"
                                keyboardType="numeric"
                                value={form.tinggiBadan.toString()}
                                onChangeText={(v) => onChange("tinggiBadan", v === "" ? 0 : parseFloat(v))}
                                className={`${
                                    form.tinggiBadan.toString() ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.tinggiBadan ? "text-black" : "text-gray-300"}`}>cm</Text>
                        </View>
                    </View>
                </View>

                {/* IMT */}
                <View>
                    <Text>IMT (BB/TB²)</Text>
                    <TextInput
                        editable={!readonly}
                        placeholder="___"
                        keyboardType="numeric"
                        value={form.imt.toString()}
                        onChangeText={(v) => onChange("imt", v === "" ? 0 : parseFloat(v))}
                        className={`${
                            form.imt.toString() ? "border-b border-black" : "border-b border-gray-300"
                        } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                    />
                </View>
            </View>
        </View>
    );
}
