import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image, Pressable, Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { useLocalSearchParams, useGlobalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getPasienInfo } from "@/services/dokterAPI";
import { User } from "lucide-react-native";
import HeadersBackButton from "@/components/pasien/HeadersBackButton"; // ✅ import

export default function CustomTabBar({
                                         state,
                                         descriptors,
                                         navigation,
                                     }: BottomTabBarProps) {
    const router = useRouter();
    const { id: rekamMedisId } = useLocalSearchParams();
    const { readonly } = useGlobalSearchParams();
    const isReadonly = readonly === "true";

    const [pasienInfo, setPasienInfo] = useState<{
        nama_pasien: string;
        medicalRecordNumber: string;
        fotoProfil: string;
    } | null>(null);

    useEffect(() => {
        const fetchPasienInfo = async () => {
            try {
                const response = await getPasienInfo(rekamMedisId as string);
                setPasienInfo({
                    fotoProfil: response.fotoProfil,
                    nama_pasien: response.nama_pasien,
                    medicalRecordNumber: response.medicalRecordNumber,
                });
            } catch (error) {
                console.error("Gagal mengambil pasien info: ", error);
            }
        };

        fetchPasienInfo();
    }, [rekamMedisId]);

    return (
        <View className="border-t border-gray-200 bg-white px-2 py-2">
            {/* ✅ Tombol back jika readonly */}
            {isReadonly && (
                <View className="px-2 mt-2">
                    <HeadersBackButton title="Rekam Medis"/>
                </View>
            )}

            {pasienInfo && (
                <View className="py-2 flex flex-row items-center gap-4 px-4">
                    {pasienInfo.fotoProfil ? (
                        <Image
                            source={{ uri: pasienInfo.fotoProfil }}
                            className="w-16 h-16 rounded-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="w-16 h-16 rounded-full bg-gray-200 justify-center items-center">
                            <User size={34} color="#aaa" />
                        </View>
                    )}
                    <View className="flex flex-col">
                        <Text className="font-semibold text-base">{pasienInfo.nama_pasien}</Text>
                        <Text className="text-sm text-gray-500">MRN : {pasienInfo.medicalRecordNumber}</Text>
                    </View>
                </View>
            )}

            <View className="flex-row justify-around ">
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel ?? options.title ?? route.name;
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate({
                                name: route.name,
                                params: { id: rekamMedisId },
                                merge: true,
                            });
                        }
                    };

                    return (
                        <Pressable
                            key={route.key}
                            onPress={onPress}
                            className="flex-1 items-center justify-center pt-4"
                        >
                            <Text
                                className={twMerge(
                                    "text-sm font-medium mb-2",
                                    isFocused ? "text-black" : "text-gray-400"
                                )}
                            >
                                {typeof label === "string" ? label : route.name}
                            </Text>
                            {isFocused ? (
                                <View className="h-1 w-full mt-2 rounded-full bg-black" />
                            ) : (
                                <View className="h-[2px] w-full mt-2 rounded-full bg-gray-300" />
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
