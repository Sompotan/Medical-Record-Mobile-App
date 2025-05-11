import {Stack} from "expo-router";
import {KeyboardAvoidingView} from "react-native";
import {Platform} from "expo-modules-core";

export default function DokterLayout() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1}}
        >
            <Stack>
                <Stack.Screen name="(tabs)" options={{
                    headerShown: false,
                }} />
                <Stack.Screen name="kunjungan" options={{ headerShown: false }} />
                <Stack.Screen name="rekam-medis" options={{ headerShown: false }} />
                <Stack.Screen name="pasien" options={{ headerShown: false }} />
            </Stack>
        </KeyboardAvoidingView>

    )
}