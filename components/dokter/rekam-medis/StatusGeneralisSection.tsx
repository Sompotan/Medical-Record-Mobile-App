import {View, Text, TextInput} from "react-native";


export type StatusGeneralisSectionProps = {
    form: {
        kepalaLeher: string;
        thorax: string;
        abdomen: string;
        ekstremitas: string;
        lainnya: string;
    }
    onChange: (field: keyof StatusGeneralisSectionProps["form"], value: string) => void;
}


const Field = ({ label, value, onChange }: {label: string, value: string, onChange: (text: string) => void})=> {
    return (
        <View className="mb-4">
            <Text className="text-sm mb-1">{label}</Text>
            <TextInput
                multiline
                textAlignVertical="top"
                className="h-[100px] border px-3 py-2 rounded-md text-sm bg-white"
                placeholder={`Masukkan status generalis bagian ${label.toLowerCase()}...`}
                value={value}
                onChangeText={onChange}
            />
        </View>
    )
}


export default function StatusGeneralisSection({form, onChange}: StatusGeneralisSectionProps) {
    return (
        <View className="mb-6">
            <Text className="font-medium text-base mb-2">Status Generalis</Text>

            <Field
                label="Kepala & Leher"
                value={form.kepalaLeher}
                onChange={(v) => onChange("kepalaLeher", v)}
            />
            <Field
                label="Thorax"
                value={form.thorax}
                onChange={(v) => onChange("thorax", v)}
            />
            <Field
                label="Abdomen"
                value={form.abdomen}
                onChange={(v) => onChange("abdomen", v)}
            />
            <Field
                label="Ekstremitas"
                value={form.ekstremitas}
                onChange={(v) => onChange("ekstremitas", v)}
            />
            <Field
                label="Lainnya"
                value={form.lainnya}
                onChange={(v) => onChange("lainnya", v)}
            />

        </View>
    )
}