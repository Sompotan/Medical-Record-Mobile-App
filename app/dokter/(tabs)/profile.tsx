import {View, Text, Alert, TouchableOpacity} from "react-native";
import {useAuth} from "@/hooks/useAuth";
import React, {useEffect, useState} from "react";
import {logoutApi} from "@/services/authService";
import {router} from "expo-router";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import AvatarUpload from "@/components/pasien/AvatarUpload";
import CardProfileInfo, {CardProfileInfoProps} from "@/components/pasien/CardProfileInfo";
import {Logout} from "@/app/icons";
import { getProfileDokter } from "@/services/dokterAPI";

type ProfilePageProps = {
    nama_lengkap: string;
    isVerified: string;
    email: string;
    fotoProfil: string;
    identifier: {
        nilai: string;
        jenis: string;
        use: string;
    }[]
} & CardProfileInfoProps

export default function ProfilePage() {
    const { logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<ProfilePageProps | null>(null)

    const handleLogout = async () => {

        try {
            await logoutApi();
            await logout();// 🔥 Kirim request logout ke server
        } catch (error) {
            console.error("[Logout API Error]", error);
            Alert.alert("Logout Server Gagal", "Keluar dari aplikasi berhasil, tetapi gagal memberi tahu server.");
        } finally {
            setLoading(false);
             // 🔥 Clear SecureStore + context
            router.replace("/"); // 🔥 Redirect ke login page
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getProfileDokter()
                setProfile(res)
            } catch (error) {
                console.error("[Profile API Error]", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile()
    }, []);

    const nik = profile?.identifier?.find(
        (item) => item.jenis === "NIK"
    )?.nilai;



    return (
        <View className="flex-1 px-6 gap-3">
            <View className="flex items-center py-6 gap-3">
                <AvatarUpload
                    fotoProfil={profile?.fotoProfil}
                />
                <Text className="text-[24px] font-semibold">{profile?.nama_lengkap}</Text>
                <View className="bg-gray-200 rounded-full">
                    <Text className="px-5 py-2 font-semibold">{profile?.isVerified === "verified" ? "Verified" : "Unverified"}</Text>
                </View>
            </View>
            <CardProfileInfo
                nik={nik || "-"}
                gender={profile?.gender === "Wanita" ? "Perempuan" : profile?.gender === "Pria" ? "Laki - Laki" : "-"}
                nomor_handphone={profile?.nomor_handphone || "-"}
                tanggal_lahir={
                    profile?.tanggal_lahir
                        ? new Date(profile.tanggal_lahir).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        })
                        : "-"
                }
            />
            <View className="flex flex-col bg-white p-4 rounded-lg border border-gray-300">
                <Text className="text-2xl font-semibold mb-2">Email</Text>
                <Text>{profile?.email}</Text>
            </View>
            <TouchableOpacity
                className="flex flex-row items-center gap-2 bg-white p-4 rounded-lg border border-gray-300"
                onPress={() => handleLogout()}
            >
                <Logout />

                {loading ? <Text className="text-lg font-semibold">Loading...</Text> : <Text className="text-lg font-semibold">Sign Out</Text>}


            </TouchableOpacity>
        </View>
    );
}