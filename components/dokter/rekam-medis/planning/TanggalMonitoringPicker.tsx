import { TanggalMonitoringPickerProps } from "@/types/rekam-medis/types";
import { useState } from "react";
import { format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { Pressable, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type Props = TanggalMonitoringPickerProps & {
    disabled?: boolean;
};

export default function TanggalMonitoringPicker({
                                                    value,
                                                    onChange,
                                                    allowedDays,
                                                    disabled = false
                                                }: Props) {
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleConfirm = (date: Date) => {
        const day = date.toLocaleDateString("id-ID", { weekday: "long" });
        if (allowedDays.includes(day)) {
            onChange(date);
            setPickerVisible(false);
        } else {
            alert("Tanggal yang dipilih tidak sesuai dengan jadwal praktik dokter.");
        }
    };

    return (
        <View className="mt-4">
            <Text className="font-medium mb-1">Tanggal Monitoring</Text>
            <Pressable
                className={`rounded-xl px-3 py-3 bg-white shadow-md ${disabled ? "opacity-50" : ""}`}
                onPress={() => {
                    if (!disabled) setPickerVisible(true);
                }}
                disabled={disabled}
            >
                <Text className="text-gray-800">
                    {value ? format(value, "EEEE, dd MMMM yyyy", { locale: localeID }) : "Pilih tanggal"}
                </Text>
            </Pressable>

            <DateTimePickerModal
                onConfirm={handleConfirm}
                onCancel={() => setPickerVisible(false)}
                mode="date"
                isVisible={!disabled && isPickerVisible}
            />
        </View>
    );
}
