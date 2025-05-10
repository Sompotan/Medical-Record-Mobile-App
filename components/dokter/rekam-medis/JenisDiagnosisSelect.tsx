import {View, Text, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

const options = [
    {label: "Utama", value:"Utama"},
    {label: "Banding", value: "Banding"},
    {label: "Lain", value: "Lain"}
];


export type JenisDiagnosisSelectProps = {
    value: string;
    onChange: (val: "Utama" | "Banding" | "Lain") => void;
}

export default function JenisDiagnosisSelect({value, onChange}: JenisDiagnosisSelectProps) {
    return (
        <View className="mb-4">
            <Text>Jenis Diagnosis</Text>
            <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={options}
                labelField="label"
                valueField="value"
                placeholder="Pilih jenis diagnosis..."
                value={value}
                onChange={(item) => {
                    onChange(item.value)
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
        color: "#d1d5db"
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});