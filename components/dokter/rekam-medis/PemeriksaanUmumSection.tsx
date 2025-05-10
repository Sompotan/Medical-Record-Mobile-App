import {View, Text, Pressable, TextInput} from "react-native";
import {ObjectiveNoteForm} from "@/types/rekam-medis/types";


type PemeriksaanUmumSectionProps = {
    form: {
        keadaanUmum: string;
        gcsEye: number;
        gcsVerbal: number;
        gcsMotor: number;
    }
    onChange: (field: keyof PemeriksaanUmumSectionProps["form"], value: any) => void;
}


const options = ["Baik", "Sedang", "Lemah"];

export default function PemeriksaanUmumSection({form, onChange} : PemeriksaanUmumSectionProps) {
    const gcsTotal = form.gcsEye + form.gcsVerbal + form.gcsMotor;

    return (
        <View className="mb-6 bg-white rounded-xl p-4">
            <Text className="font-medium text-xl mb-2">Keadaan Umum</Text>
            <View className="flex-row mb-4 items-center justify-between px-2">
                {options.map((option) => (
                    <Pressable
                        key={option}
                        onPress={() => onChange("keadaanUmum", option)}
                        className="flex-row items-center"
                    >
                        <View className={`w-4 h-4 rounded-full border mr-2 ${form.keadaanUmum === option ? "bg-black": "bg-white"}`} />
                        <Text>{option}</Text>
                    </Pressable>
                ))}
            </View>

            <Text className="font-medium text-xl mb-2">Kesadaran (GCS)</Text>
            <View className="flex-row items-center justify-between gap-10 pr-8 pl-2">
                <View className="flex-1 flex-row items-center gap-2">
                    <Text>E :</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={form.gcsEye.toString()}
                        onChangeText={(v) => onChange("gcsEye", parseInt(v || "0"))}
                        className="border w-full py-1 rounded-md text-start"
                    />
                </View>
                <View className="flex-1 flex-row items-center gap-2 ">
                    <Text>V :</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={form.gcsVerbal.toString()}
                        onChangeText={(v) => onChange("gcsVerbal", parseInt(v || "0"))}
                        className="border w-full px-2 py-1 rounded-md text-start"
                    />
                </View>
                <View className="flex-1 flex-row items-center gap-2">
                    <Text>M :</Text>
                    <TextInput
                        keyboardType="numeric"
                        value={form.gcsMotor.toString()}
                        onChangeText={(v) => onChange("gcsMotor", parseInt(v || "0"))}
                        className="border w-full px-2 py-1 rounded-md text-start"
                    />
                </View>
            </View>
            <Text className="mt-2 text-sm">Total: {gcsTotal}</Text>
        </View>
    )

}