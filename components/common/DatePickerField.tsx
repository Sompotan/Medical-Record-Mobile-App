import {useState} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerFieldProps {
    label: string;
    value: Date | null;
    onChange: (date: Date) => void;
}

export default function DatePickerField({ label, value, onChange }: DatePickerFieldProps) {
    const [show, setShow] = useState(false);

    return(
        <View className="mb-4">
            <Text className="mb-2 font-semibold text-gray-700">{label}</Text>
            <TouchableOpacity
                onPress={() => setShow(true)}
                className="border rounded-md px-4 py-3"
            >
                <Text className={`text-gray-700 ${!value && 'text-gray-400'}`}>
                    {value ? value.toLocaleDateString() : "Pilih Tanggal"}
                </Text>
            </TouchableOpacity>

            {show && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShow(false);
                        if (selectedDate) {
                            onChange(selectedDate)
                        }
                    }}
                />
            )}

        </View>
    )
}