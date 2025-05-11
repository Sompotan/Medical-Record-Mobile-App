import {Stack} from "expo-router";
import {KeyboardAvoidingView} from "react-native";
import {Platform} from "expo-modules-core";

export default function PasienLayout() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // atur sesuai tinggi header jika ada
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="daftar-kunjungan" options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="rekam-medis" options={{
                    headerShown: false,
                }} />
            </Stack>
        </KeyboardAvoidingView>

    )
}