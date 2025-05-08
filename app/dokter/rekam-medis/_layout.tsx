import {Stack} from "expo-router";

export default function RekamMedisLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="(tabs)" options={{
                headerShown: false,
            }} />
        </Stack>
    )
}