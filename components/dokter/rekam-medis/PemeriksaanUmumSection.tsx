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
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Keadaan Umum</Text>
            <View className="flex-row space-x-4 mb-4">
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

            <Text className="font-medium text-base mb-2">Kesadaran (GCS)</Text>
            <View className="flex-row items-center space-x-2">
                <Text>E :</Text>
                <TextInput
                    keyboardType="numeric"
                    value={form.gcsEye.toString()}
                    onChangeText={(v) => onChange("gcsEye", parseInt(v || "0"))}
                    className="border w-12 px-2 py-1 rounded-md text-center"
                />
                <Text>V :</Text>
                <TextInput
                    keyboardType="numeric"
                    value={form.gcsVerbal.toString()}
                    onChangeText={(v) => onChange("gcsVerbal", parseInt(v || "0"))}
                    className="border w-12 px-2 py-1 rounded-md text-center"
                />
                <Text>M :</Text>
                <TextInput
                    keyboardType="numeric"
                    value={form.gcsMotor.toString()}
                    onChangeText={(v) => onChange("gcsMotor", parseInt(v || "0"))}
                    className="border w-12 px-2 py-1 rounded-md text-center"
                />
            </View>
            <Text className="mt-2 text-sm">Total: {gcsTotal}</Text>
        </View>
    )

}