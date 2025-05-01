import {Text, View} from "react-native";
import {Calendar} from "@/assets";
import React from "react";

export type CardHistoryItemProps = {
    id: string;
    alasan_kunjungan: string;
    nama_dokter: string;
    status: string;
    tanggal_kunjungan: string;
}

export default function CardHistoryItem({alasan_kunjungan, nama_dokter, status, tanggal_kunjungan}: CardHistoryItemProps) {
    return (
        <View className="px-4 mb-3">
            <View className="bg-white px-6 py-4 flex flex-col gap-4 rounded-lg border border-gray-300">
                <View className="flex flex-row justify-between items-start">
                    <View>
                        <Text className="text-[20px] font-semibold">{nama_dokter}</Text>
                        <Text className="text-[15px]">{alasan_kunjungan}</Text>
                    </View>
                    <View className="bg-gray-200 rounded-full">
                        <Text className="px-5 py-2 font-semibold">{status}</Text>
                    </View>
                </View>
                <View className="flex flex-row gap-2">
                    <Calendar/>
                    <Text>{tanggal_kunjungan}</Text>
                </View>
            </View>
        </View>
    )
}