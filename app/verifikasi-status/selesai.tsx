import {useEffect, useState} from "react";
import api from "@/services/api";
import {ActivityIndicator, View, Text} from "react-native";
import * as Animatable from "react-native-animatable";
import {Check, CheckCircle, Clock} from "lucide-react-native";
import {useRouter} from "expo-router";

export default function SelesaiVerifikasi() {
    const [status, setStatus] = useState<"loading" | "menunggu" | "verified">("loading")
    const [submittedAt, setSubmittedAt] = useState<string | null>(null)

    const router = useRouter();

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const res = await api.get("/pasien/verifikasi-status")
                const newStatus = res.data.status
                setStatus(res.data.status);
                setSubmittedAt(res.data.diajukanPada)

                if (newStatus === "verified") {
                    setTimeout(() => {
                        router.replace("/pasien")
                    }, 3000)
                }

            } catch (error) {
                console.error("[Verifikasi] Gagal Mengambil Status : ", error)
            }
        }

        fetchStatus();
    }, []);

    if (status === "loading") {
        return (
            <View className="flex-1 justify-center items-center bg-white" >
                <ActivityIndicator size={"large"} color={"#2563EB"}/>
            </View>
        )
    }

    return (
        <View className="flex-1 justify-center items-center bg-white px-6">
            {status === "menunggu" ? (
                <Animatable.View animation="fadeInUp" duration={90} className="items-center w-full px-8">
                    <Clock size={72} strokeWidth={1.5} color="black" style={{
                        paddingBottom: 100}} />
                    <Text className="text-xl font-bold mb-2">Verifikasi Berhasil Di Kirim</Text>
                    <Text className="text-gray-500 mb-6 text-center">Menunggu Persetujuan dari Klinik</Text>

                    <View className="w-full border rounded-lg p-4 flex-col gap-3">
                        <View className="flex-row justify-between mb-2">
                            <Text className="font-semibold">Status</Text>
                            <Text className="text-yellow-600 font-semibold">Pending</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="font-semibold">Dikirim pada</Text>
                            <Text>{submittedAt ? new Date(submittedAt).toLocaleDateString() : "-"}</Text>
                        </View>
                        <View className="flex-row justify-between">
                            <Text className="font-semibold">Estimasi Waktu</Text>
                            <Text>24 - 48 Jam</Text>
                        </View>
                    </View>
                </Animatable.View>
            ) : (
                <Animatable.View animation="fadeInUp" duration={800} className="items-center">
                    <CheckCircle size={72} strokeWidth={1.5} color="black" style={{
                        paddingBottom:100
                        }}
                    />
                    <Text className="text-xl font-bold">Verifikasi Berhasil Di Setujui</Text>
                </Animatable.View>
            )}
        </View>
    );
}