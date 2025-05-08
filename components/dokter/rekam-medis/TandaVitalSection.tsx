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
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Tanda Vital</Text>

            <View className="border p-4 rounded-lg space-y-3">
                <View className="flex-row justify-between space-x-4">
                    <View className='flex-1'>
                        <Text className="text-sm">Tekanan Darah</Text>
                        <TextInput
                            placeholder="___ mmHg"
                            value={form.tekananDarah}
                            onChangeText={(v) => onChange("tekananDarah", v)}
                            className="border px-2 py-1 rounded-md mt-1"
                        />
                    </View>
                    <View className='flex-1'>
                        <Text className="text-sm">Nadi</Text>
                        <TextInput
                            placeholder="___ x/menit"
                            keyboardType="numeric"
                            value={form.nadi.toString()}
                            onChangeText={(v) => onChange("nadi", parseInt(v || "0"))}
                            className="border px-2 py-1 rounded-md mt-1"
                        />
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between space-x-4">
                <View className='flex-1'>
                    <Text className="text-sm">Suhu</Text>
                    <TextInput
                        placeholder="___ °C"
                        keyboardType="numeric"
                        value={form.suhu.toString()}
                        onChangeText={(v) => onChange("suhu", parseInt(v || "0"))}
                        className="border px-2 py-1 rounded-md mt-1"
                    />
                </View>
                <View className='flex-1'>
                    <Text className="text-sm">Frek. Nafas</Text>
                    <TextInput
                        placeholder="___ x/menit"
                        keyboardType="numeric"
                        value={form.frekuensiNafas.toString()}
                        onChangeText={(v) => onChange("frekuensiNafas", parseInt(v || "0"))}
                        className="border px-2 py-1 rounded-md mt-1"
                    />
                </View>
            </View>
        </View>
    )
}