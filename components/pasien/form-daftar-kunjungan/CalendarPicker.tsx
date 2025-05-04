import {setupCalendarLocale} from "@/utils/calendarLocale";
import moment from "moment";
import {useEffect, useState} from "react";
import {Calendar} from "react-native-calendars";
import "moment/locale/id";
import {Text, View} from "react-native";


setupCalendarLocale()

type CalendarPickerProps = {
    allowedDays: string[];
    selectedDate: string | null;
    onDateSelect: (date: string) => void;
}

type MarkedDateType = {
    [date: string] : {
        selected?: boolean;
        selectedColor?: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    }
}



export default function CalendarPicker({allowedDays, selectedDate, onDateSelect}: CalendarPickerProps) {
    const [markedDate, setMarkedDate] = useState<MarkedDateType>({})

    useEffect(() => {
        const today = moment();
        const end = moment().add(1, "year")
        const newMarkedDates: MarkedDateType = {};

        for (let m = moment(today); m.isSameOrBefore(end); m.add(1, "day")) {
            const dayName = m.locale("id").format("dddd"); // Pastikan format sesuai bahasa

            const dateStr = m.format("YYYY-MM-DD");

            // Hanya hari yang diizinkan yang bisa dipilih
            if (allowedDays.includes(dayName)) {
                newMarkedDates[dateStr] = {
                    disabled: false,
                    selected: false,
                    selectedColor: "black",
                    disableTouchEvent: false
                };
            } else {
                newMarkedDates[dateStr] = {
                    disabled: true,
                    disableTouchEvent: true
                };
            }
        }

        setMarkedDate(newMarkedDates);
    }, [allowedDays]);


    return (
        <View className="bg-white px-2">
            <Calendar
                markedDates={{
                    ...markedDate,
                    ...(selectedDate && {
                        [selectedDate]: {
                            ...(markedDate[selectedDate] || {}),
                            selected: true,
                            selectedColor: "black"
                        }
                    })
                }}
                onDayPress={({ dateString }: {dateString: string}) => {
                    if (!markedDate[dateString]?.disabled) {
                        onDateSelect(dateString);
                    }
                }}
                theme={{
                    todayTextColor: "black",
                    selectedDayBackgroundColor: "black",
                    arrowColor: "black",
                }}
            />
            {selectedDate && (
                <Text className="text-center my-6 px-2">
                    <Text className="font-semibold">Tanggal : </Text>{moment(selectedDate).locale("id").format("dddd, D MMMM YYYY")}
                </Text>
            )}
        </View>

    )
}