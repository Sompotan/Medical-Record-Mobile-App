import {AuthProvider} from "@/contexts/AuthContext";
import {Stack} from "expo-router";
import "./global.css";
import 'react-native-url-polyfill/auto';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function RootLayout() {
    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerShown: true,
                }}
            />
        </AuthProvider>
    )
}