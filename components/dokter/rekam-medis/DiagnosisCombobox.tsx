import {useEffect, useState} from "react";
import {fetchKodeKlinis} from "@/services/rekamMedisAPI";
import {View, Text, ActivityIndicator, StyleSheet} from "react-native";
import {Dropdown} from "react-native-element-dropdown";

export type DiagnosisOption = {
    id: string;
    kode: string;
    Display: string;
    system: string;
}

type DiagnosisComboboxProps = {
    label: string;
    value: DiagnosisOption | null;
    onChange: (option: DiagnosisOption) => void;
}

export default function DiagnosisCombobox({label, value, onChange}: DiagnosisComboboxProps) {
    const [query, setQuery] = useState("")
    const [options, setOptions] = useState<DiagnosisOption[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!query || query.length < 2) return;

        const delay = setTimeout( async () => {
            setLoading(true)
            try {
                const res = await fetchKodeKlinis(query)
                setOptions(res)
            } catch (error) {
                console.error("Gagal mencari kode klinis:", error)
            } finally {
                setLoading(false)
            }
        })

    }, [query])

    return (
        <View className="my-4">
            <Text className="font-medium mb-2">{label}</Text>

        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={options}
            search
            labelField="Display"
            valueField="id"
            placeholder="Cari diagnosa..."
            searchPlaceholder="Ketik untuk mencari..."
            value={value?.id}
            onChange={(item) => {
                onChange(item)
                setQuery(item.Display)
            }}
            onChangeText={(val) => {
                setQuery(val);
            }}
            renderLeftIcon={() =>
                loading ? <ActivityIndicator size="small" /> : null
            }
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