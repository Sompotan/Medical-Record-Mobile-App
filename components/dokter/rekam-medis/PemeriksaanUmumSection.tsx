import { View, Text, Pressable, TextInput } from "react-native";

type PemeriksaanUmumSectionProps = {
    form: {
        keadaanUmum: string;
        gcsEye: number;
        gcsVerbal: number;
        gcsMotor: number;
    };
    onChange: (field: keyof PemeriksaanUmumSectionProps["form"], value: any) => void;
    readonly?: boolean;
};

const options = ["Baik", "Sedang", "Lemah"];

export default function PemeriksaanUmumSection({ form, onChange, readonly }: PemeriksaanUmumSectionProps) {
    const gcsTotal = form.gcsEye + form.gcsVerbal + form.gcsMotor;

    return (
        <View className="mb-6 bg-white rounded-xl p-4 shadow-md">
            <Text className="font-medium text-xl mb-2">Keadaan Umum</Text>
            <View className="flex-row mb-4 items-center justify-between px-2">
                {options.map((option) => (
                    <Pressable
                        key={option}
                        onPress={() => {
                            if (!readonly) onChange("keadaanUmum", option);
                        }}
                        className="flex-row items-center"
                        disabled={readonly}
                    >
                        <View
                            className={`w-4 h-4 rounded-full border mr-2 ${
                                form.keadaanUmum === option ? "bg-black" : "bg-white"
                            } ${readonly ? "opacity-50" : ""}`}
                        />
                        <Text className={`${readonly ? "text-gray-500" : ""}`}>{option}</Text>
                    </Pressable>
                ))}
            </View>

            <Text className="font-medium text-xl mb-2">Kesadaran (GCS)</Text>
            <View className="flex-row items-center justify-between gap-10 pr-8 pl-2">
                <View className="flex-1 flex-row items-center gap-2">
                    <Text>E :</Text>
                    <TextInput
                        keyboardType="numeric"
                        editable={!readonly}
                        value={form.gcsEye.toString()}
                        onChangeText={(v) => onChange("gcsEye", parseInt(v || "0"))}
                        className="border w-full py-1 rounded-md text-start px-2 bg-white"
                    />
                </View>
                <View className="flex-1 flex-row items-center gap-2">
                    <Text>V :</Text>
                    <TextInput
                        keyboardType="numeric"
                        editable={!readonly}
                        value={form.gcsVerbal.toString()}
                        onChangeText={(v) => onChange("gcsVerbal", parseInt(v || "0"))}
                        className="border w-full py-1 rounded-md text-start px-2 bg-white"
                    />
                </View>
                <View className="flex-1 flex-row items-center gap-2">
                    <Text>M :</Text>
                    <TextInput
                        keyboardType="numeric"
                        editable={!readonly}
                        value={form.gcsMotor.toString()}
                        onChangeText={(v) => onChange("gcsMotor", parseInt(v || "0"))}
                        className="border w-full py-1 rounded-md text-start px-2 bg-white"
                    />
                </View>
            </View>
            <Text className="mt-2 text-sm">Total: {gcsTotal}</Text>
        </View>
    );
}
