import {View, Text, TouchableOpacity, ScrollView} from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
} from "react-native-reanimated";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState} from "react";
import {Calendar} from "@/assets";
import {getRekamMedisById} from "@/services/dokterAPI";

export type RekamMedicsCardProps = {
    id: string;
    tanggal: string;
    pasien: string;
    dokter: string;
}

export default function RekamMedisCard({id, tanggal, pasien, dokter}: RekamMedicsCardProps) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<any>(null)
    const height = useSharedValue(0); // default height collapsed

    const animatedStyle = useAnimatedStyle(() => ({
        height: height.value,
        overflow: "hidden",
    }));

    const toggleCard = async () => {

        if (!open && !detail) {
            try {
                const res = await getRekamMedisById(id)
                setDetail(res)
            } catch (error) {
                console.error("Gagal ambil detail rekam medis", error)
            }
        }

        setOpen(!open);
        height.value = withSpring(open ? 0 : 310, {
            damping: 15,
            stiffness: 120,
        }); // spring animation
    };

    return (
        <View className="bg-white rounded-lg border border-gray-300 ">
            <TouchableOpacity onPress={toggleCard} className="px-4 pt-4 flex flex-col gap-4">
                <View className="flex flex-col">
                    <Text className="text-lg font-semibold">{dokter}</Text>
                    <Text>{pasien}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row gap-2">
                        <Calendar/>
                        <Text>{new Date(tanggal).toLocaleDateString("id-ID")}</Text>
                    </View>
                    <Text className="text-sm text-gray-500">
                        {open ? "Tutup Detail" : "Lihat Detail"}
                    </Text>
                </View>
            </TouchableOpacity>

            <Animated.View style={animatedStyle} className="px-4 pt-4 pb-2 ">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {!detail ? (
                        <Text>Memuat data rekam medis...</Text>
                    ) : (
                        <View className="flex flex-col gap-4 pb-6">
                            {/* Tanda Vital */}
                            <Text className="text-[20px] font-semibold">Tanda Vital</Text>
                            <View className="flex flex-row items-center gap-20">
                                <View>
                                    <Text className="text-sm text-[#707070]">Tekanan Darah</Text>
                                    <Text className="text-2xl font-semibold">
                                        {detail.utama.objectiveNote?.tandaVital?.tekananDarah ?? "-"}
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-sm text-[#707070]">Detak Jantung</Text>
                                    <Text className="text-2xl font-semibold">
                                        {detail.utama.objectiveNote?.tandaVital?.nadi ?? "-"}
                                    </Text>
                                </View>
                            </View>

                            {/* Keluhan */}
                            <View>
                                <Text className="text-[20px] font-semibold">Keluhan</Text>
                                <Text className="text-base">
                                    {detail.utama.subjectiveNote?.keluhanPasien?.map((k: {
                                        deskripsi: any;
                                    }) => k.deskripsi).join(", ") || "-"}
                                </Text>
                            </View>

                            {/* Diagnosa */}
                            <View>
                                <Text className="text-[20px] font-semibold">Diagnosa</Text>
                                <Text className="text-base">
                                    {detail.utama.assessmentNote?.diagnosisPasien?.map((d: {
                                        deskripsi: any;
                                    }) => d.deskripsi).join(", ") || "-"}
                                </Text>
                            </View>

                            {/* Resep Obat */}
                            <View>
                                <Text className="text-[20px] font-semibold">Resep Obat</Text>
                                <View className="flex flex-col gap-2">
                                    {detail.utama.resepObat?.itemObat?.length > 0 ? (
                                        detail.utama.resepObat.itemObat.map((item: { obat: { namaObat: any; }; dosis: any; frekuensi: any; catatan: any; }, idx: Key | null | undefined) => (
                                            <View key={idx} className="flex flex-col gap-1">
                                                <View className="flex flex-row items-center justify-between">
                                                    <Text>{item.obat?.namaObat ?? "-"}</Text>
                                                    <Text className="text-[#707070]">{item.dosis ?? "-"}</Text>
                                                </View>
                                                <Text className="text-[#707070]">{item.frekuensi ?? "-"}</Text>
                                                {item.catatan ? (
                                                    <Text className="text-[#707070]">{item.catatan ?? "-"}</Text>
                                                ) : null}
                                            </View>
                                        ))
                                    ) : (
                                        <Text className="text-[#707070]">Tidak ada resep</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </Animated.View>
        </View>
    );
}
