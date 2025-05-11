import { View, Text, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useState } from "react";
import { Calendar } from "@/assets";
import { getRekamMedisById } from "@/services/dokterAPI";

export type RekamMedicsCardProps = {
    id: string;
    tanggal: string;
    pasien: string;
    dokter: string;
};

export default function RekamMedisCard({ id, tanggal, pasien, dokter }: RekamMedicsCardProps) {
    const [open, setOpen] = useState(false);
    const [detail, setDetail] = useState<any>(null);

    const toggleCard = async () => {
        if (!open && !detail) {
            try {
                const res = await getRekamMedisById(id);
                setDetail(res);
            } catch (error) {
                console.error("Gagal ambil detail rekam medis", error);
            }
        }
        setOpen(!open);
    };

    return (
        <View className="bg-white rounded-lg border border-gray-300 mb-4 overflow-hidden">
            <TouchableOpacity onPress={toggleCard} className="px-4 pt-4 flex flex-col gap-4 py-4">
                <View className="flex flex-col">
                    <Text className="text-lg font-semibold">{dokter}</Text>
                    <Text>{pasien}</Text>
                </View>
                <View className="flex flex-row items-center justify-between">
                    <View className="flex flex-row gap-2">
                        <Calendar />
                        <Text>{new Date(tanggal).toLocaleDateString("id-ID")}</Text>
                    </View>
                    <Text className="text-sm text-gray-500">
                        {open ? "Tutup Detail" : "Lihat Detail"}
                    </Text>
                </View>
            </TouchableOpacity>

            {open && (
                <Animated.View
                    // kamu bisa tambah entering/exiting animation kalau pakai Reanimated 3
                    className="px-4 pt-4 pb-2"
                >
                    {!detail ? (
                        <Text>Memuat data rekam medis...</Text>
                    ) : (
                        <View className="flex flex-col gap-4 pb-6">
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

                            <View>
                                <Text className="text-[20px] font-semibold">Keluhan</Text>
                                <Text className="text-base">
                                    {detail.utama.subjectiveNote?.keluhanPasien
                                        ?.map((k: any) => k.deskripsi)
                                        .join(", ") || "-"}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-[20px] font-semibold">Diagnosa</Text>
                                <Text className="text-base">
                                    {detail.utama.assessmentNote?.diagnosisPasien
                                        ?.map((d: any) => d.deskripsi)
                                        .join(", ") || "-"}
                                </Text>
                            </View>

                            <View>
                                <Text className="text-[20px] font-semibold">Resep Obat</Text>
                                <View className="flex flex-col gap-2">
                                    {detail.utama.resepObat?.itemObat?.length > 0 ? (
                                        detail.utama.resepObat.itemObat.map((item: any, idx: number) => (
                                            <View key={idx} className="flex flex-col gap-1">
                                                <View className="flex flex-row items-center justify-between">
                                                    <Text>{item.obat?.namaObat ?? "-"}</Text>
                                                    <Text className="text-[#707070]">{item.dosis ?? "-"}</Text>
                                                </View>
                                                <Text className="text-[#707070]">{item.frekuensi ?? "-"}</Text>
                                                {item.catatan && (
                                                    <Text className="text-[#707070]">{item.catatan ?? "-"}</Text>
                                                )}
                                            </View>
                                        ))
                                    ) : (
                                        <Text className="text-[#707070]">Tidak ada resep</Text>
                                    )}
                                </View>
                            </View>
                        </View>
                    )}
                </Animated.View>
            )}
        </View>
    );
}
