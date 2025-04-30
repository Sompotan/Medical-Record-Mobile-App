import {Text, TextInput, TextInputProps, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import {Ionicons} from "@expo/vector-icons";


interface InputFieldProps extends TextInputProps {
    label?: string;
    error?: string;
    isPassword?: boolean;
}

export default function InputField({label, error, isPassword = false, ...props}: InputFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="w-full mb-4">
            {label && <Text className="mb-1 text-sm font-semibold">{label}</Text>}

            <View className="relative">
                <TextInput
                    {...props}
                    secureTextEntry={isPassword && !showPassword}
                    className="border rounded-md p-3 pr-12 text-base"
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                        <Ionicons
                            name={showPassword ? "eye-outline" : "eye-off-outline"}
                            size={24}
                            color="gray"
                        />

                    </TouchableOpacity>
                )}
            </View>

            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
}