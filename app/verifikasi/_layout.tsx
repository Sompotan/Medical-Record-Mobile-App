import {useAuth} from "@/hooks/useAuth";
import {Slot, Stack, usePathname, useRouter} from "expo-router";
import {useEffect} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import StepIndicatorItem from "@/components/common/StepIndicatorItem";
import {FontAwesome5, Ionicons} from "@expo/vector-icons";

export default function VerifikasiLayout() {
    const { user, loading } = useAuth();
    const router = useRouter()
    const pathname= usePathname()

    useEffect(() => {
        if (!loading && user?.isVerified === "verified") {
            router.replace("/");
        }
    }, [user, loading]);

    const currentStep = () => {
        if (pathname.includes("step1")) return "step1";
        if (pathname.includes("step2")) return "step2";
        if (pathname.includes("step3")) return "step3";
        return null;
    }

    return (
        <View className="flex-1 bg-white">
            <View className="bg-gray-100 p-4">
                <View className="flex flex-row gap-2 mb-2">
                    <Ionicons name="checkmark-circle-outline" size={28} color="black"/>
                    <Text className="text-[20px] font-bold mb-2 text-center">Verifikasi Identitas Anda</Text>
                </View>

                <View className="flex-row justify-between mb-4">
                    <StepIndicatorItem
                        icon={<Ionicons name="card-outline" size={24} color="black" />}
                        label="ID Card"
                        isActive={currentStep() === "step1"}
                        onPress={() => router.push("/verifikasi/step1")}
                    />
                    <StepIndicatorItem
                        icon={<Ionicons name="location-outline" size={24} color="black" />}
                        label="Alamat"
                        isActive={currentStep() === "step2"}
                        onPress={() => router.push("/verifikasi/step2")}
                    />
                    <StepIndicatorItem
                        icon={<FontAwesome5 name="wallet" size={24} color="black" />}
                        label="Pembiayaan"
                        isActive={currentStep() === "step3"}
                        onPress={() => router.push("/verifikasi/step3")}
                    />
                </View>

                <Text className="text-gray-500 pl-2">* Harap isi data diri sesuai dengan KTP anda</Text>
            </View>
            <View className="flex-1">
                <Slot />
            </View>
        </View>

    )

}