import { View, Text, TextInput } from "react-native";

export type StatusGeneralisSectionProps = {
    form: {
        kepalaLeher: string;
        thorax: string;
        abdomen: string;
        ekstremitas: string;
        lainnya: string;
    };
    onChange: (field: keyof StatusGeneralisSectionProps["form"], value: string) => void;
    readonly?: boolean;
};

const Field = ({
                   label,
                   value,
                   onChange,
                   readonly,
               }: {
    label: string;
    value: string;
    onChange: (text: string) => void;
    readonly?: boolean;
}) => {
    return (
        <View>
            <Text className="text-sm mb-1">{label}</Text>
            <TextInput
                editable={!readonly}
                multiline
                textAlignVertical="top"
                className={`${
                    value ? "border-b border-black" : "border-b border-gray-300"
                } w-full px-2 py-1 rounded-md mt-1 bg-white`}
                placeholder={`Masukkan status generalis bagian ${label.toLowerCase()}...`}
                value={value}
                onChangeText={onChange}
            />
        </View>
    );
};

export default function StatusGeneralisSection({ form, onChange, readonly = false }: StatusGeneralisSectionProps) {
    return (
        <View className="mb-6 bg-white rounded-xl p-4 shadow-md">
            <Text className="font-medium text-xl mb-2">Status Generalis</Text>
            <View className="p-2 gap-6">
                <Field
                    label="Kepala & Leher"
                    value={form.kepalaLeher}
                    onChange={(v) => onChange("kepalaLeher", v)}
                    readonly={readonly}
                />
                <Field
                    label="Thorax"
                    value={form.thorax}
                    onChange={(v) => onChange("thorax", v)}
                    readonly={readonly}
                />
                <Field
                    label="Abdomen"
                    value={form.abdomen}
                    onChange={(v) => onChange("abdomen", v)}
                    readonly={readonly}
                />
                <Field
                    label="Ekstremitas"
                    value={form.ekstremitas}
                    onChange={(v) => onChange("ekstremitas", v)}
                    readonly={readonly}
                />
                <Field
                    label="Lainnya"
                    value={form.lainnya}
                    onChange={(v) => onChange("lainnya", v)}
                    readonly={readonly}
                />
            </View>
        </View>
    );
}
