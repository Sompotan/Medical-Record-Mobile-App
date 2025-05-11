import { JenisLayananSelectProps } from "@/types/rekam-medis/types";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { JENIS_LAYANAN_OPTIONS } from "@/constants/rencanaOptions";

type Props = JenisLayananSelectProps & {
    disabled?: boolean;
};

export default function JenisLayananSelect({ value, onChange, disabled = false }: Props) {
    return (
        <View className="mt-4">
            <Text className="font-medium mb-1">Jenis Layanan</Text>
            <View className={`rounded-xl bg-white shadow-md ${disabled ? "opacity-50" : ""}`}>
                <Picker
                    enabled={!disabled}
                    selectedValue={value}
                    onValueChange={(val) => {
                        if (!disabled) onChange(val);
                    }}
                    mode="dropdown"
                >
                    <Picker.Item label="Pilih jenis layanan..." value={undefined} />
                    {JENIS_LAYANAN_OPTIONS.map((opt) => (
                        <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                    ))}
                </Picker>
            </View>
        </View>
    );
}
