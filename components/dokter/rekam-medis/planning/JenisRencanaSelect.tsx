import { JenisRencanaSelectProps } from "@/types/rekam-medis/types";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { JENIS_RENCANA_OPTIONS } from "@/constants/rencanaOptions";

type Props = JenisRencanaSelectProps & {
    disabled?: boolean;
};

export default function JenisRencanaSelect({ value, onChange, disabled = false }: Props) {
    return (
        <View className="mt-4">
            <Text className="font-medium mb-1">Jenis Rencana</Text>
            <View className={`rounded-xl bg-white shadow-md ${disabled ? "opacity-50" : ""}`}>
                <Picker
                    enabled={!disabled}
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (!disabled) onChange(val);
                    }}
                    mode="dropdown"
                >
                    <Picker.Item label="Pilih jenis rencana..." value={undefined} />
                    {JENIS_RENCANA_OPTIONS.map((opt) => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}
