import {View, Text, TextInput} from "react-native";
import {ObjectiveNoteForm} from "@/types/rekam-medis/types";


export type TandaVitalSectionProps = {
    form: {
        tekananDarah: string;
        nadi: number;
        suhu: number;
        frekuensiNafas: number;
    };
    onChange: (field: keyof TandaVitalSectionProps["form"], value: any) => void;
}


export default function TandaVitalSection({form, onChange} : TandaVitalSectionProps) {
    return (
        <View className="mb-6 bg-white rounded-xl p-4">
            <Text className="font-medium text-xl">Tanda Vital</Text>

            <View className="p-2 rounded-lg gap-3">
                <View className="flex-row justify-between space-x-4">
                    <View className='flex-1'>
                        <Text className="text-sm">Tekanan Darah</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                placeholder="00/00"
                                value={form.tekananDarah}
                                onChangeText={(v) => onChange("tekananDarah", v)}
                                className={`${form.tekananDarah ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.tekananDarah ? "text-black" : "text-gray-300"}`}>mmHg</Text>
                        </View>

                    </View>
                    <View className='flex-1'>
                        <Text className="text-sm">Nadi</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                placeholder="000"
                                keyboardType="numeric"
                                value={form.nadi.toString()}
                                onChangeText={(v) => onChange("nadi", parseInt(v || "0"))}
                                className={`${form.nadi.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.nadi.toString() ? "text-black" : "text-gray-300"}`}>x/menit</Text>
                        </View>

                    </View>
                </View>
                <View className="flex-row justify-between space-x-4">
                    <View className='flex-1'>
                        <Text className="text-sm">Suhu</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                placeholder="___ °C"
                                keyboardType="numeric"
                                value={form.suhu.toString()}
                                onChangeText={(v) => onChange("suhu", parseInt(v || "0"))}
                                className={`${form.suhu.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.suhu.toString() ? "text-black" : "text-gray-300"}`}>°C</Text>
                        </View>

                    </View>
                    <View className='flex-1'>
                        <Text className="text-sm">Frek. Nafas</Text>
                        <View className="flex flex-row items-end">
                            <TextInput
                                placeholder="0"
                                keyboardType="numeric"
                                value={form.frekuensiNafas.toString()}
                                onChangeText={(v) => onChange("frekuensiNafas", parseInt(v || "0"))}
                                className={`${form.frekuensiNafas.toString() ? "border-b border-black w-20" : "border-b border-gray-300"} w-20 px-2 py-1 rounded-md mt-1`}
                            />
                            <Text className={`${form.frekuensiNafas.toString() ? "text-black" : "text-gray-300"}`}>x/menit</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}