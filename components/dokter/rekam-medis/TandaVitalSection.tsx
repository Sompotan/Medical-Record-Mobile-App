import { View, Text, TextInput } from "react-native";

export type TandaVitalSectionProps = {
    form: {
        tekananDarah: string;
        nadi: number;
        suhu: number;
        frekuensiNafas: number;
    };
    onChange: (field: keyof TandaVitalSectionProps["form"], value: any) => void;
    readonly?: boolean;
};

export default function TandaVitalSection({ form, onChange, readonly = false }: TandaVitalSectionProps) {
    return (
        <View className="mb-6 bg-white rounded-xl p-4 shadow-md">
            <Text className="font-medium text-xl">Tanda Vital</Text>

            <View className="p-2 rounded-lg gap-3">
                <View className="flex-row justify-between space-x-4">
                    {/* Tekanan Darah */}
                    <View className="flex-1">
                        <Text className="text-sm">Tekanan Darah</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                editable={!readonly}
                                placeholder="00/00"
                                value={form.tekananDarah}
                                onChangeText={(v) => onChange("tekananDarah", v)}
                                className={`${
                                    form.tekananDarah ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.tekananDarah ? "text-black" : "text-gray-300"}`}>mmHg</Text>
                        </View>
                    </View>

                    {/* Nadi */}
                    <View className="flex-1">
                        <Text className="text-sm">Nadi</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                editable={!readonly}
                                placeholder="000"
                                keyboardType="numeric"
                                value={form.nadi.toString()}
                                onChangeText={(v) => onChange("nadi", parseInt(v || "0"))}
                                className={`${
                                    form.nadi ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.nadi ? "text-black" : "text-gray-300"}`}>x/menit</Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-between space-x-4">
                    {/* Suhu */}
                    <View className="flex-1">
                        <Text className="text-sm">Suhu</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                editable={!readonly}
                                placeholder="___ °C"
                                keyboardType="numeric"
                                value={form.suhu.toString()}
                                onChangeText={(v) => onChange("suhu", parseInt(v || "0"))}
                                className={`${
                                    form.suhu ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.suhu ? "text-black" : "text-gray-300"}`}>°C</Text>
                        </View>
                    </View>

                    {/* Frekuensi Nafas */}
                    <View className="flex-1">
                        <Text className="text-sm">Frek. Nafas</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                editable={!readonly}
                                placeholder="0"
                                keyboardType="numeric"
                                value={form.frekuensiNafas.toString()}
                                onChangeText={(v) => onChange("frekuensiNafas", parseInt(v || "0"))}
                                className={`${
                                    form.frekuensiNafas ? "border-b border-black" : "border-b border-gray-300"
                                } w-20 px-2 py-1 rounded-md mt-1 bg-white`}
                            />
                            <Text className={`${form.frekuensiNafas ? "text-black" : "text-gray-300"}`}>x/menit</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
