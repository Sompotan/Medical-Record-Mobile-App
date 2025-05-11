import { TouchableOpacity, View } from "react-native";
import UserProfileBeranda from "@/components/pasien/UserProfileBeranda";
import { Notification } from "@/app/icons";
import NewsCarousel from "@/components/pasien/NewsCarousel";
import CardButton from "@/components/pasien/CardButton";
import { MedicalHistory, Visit } from "@/assets";
import { useEffect, useState } from "react";
import { getProfilePasien } from "@/services/pasien";
import {getProfileDokter} from "@/services/dokterAPI";

type BerandaProps = {
    nama_lengkap: string;
    fotoProfil: string;
}

export default function Beranda() {
    const [profile, setProfile] = useState<BerandaProps | null>(null);
    const [loading, setLoading] = useState(true);

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

    return (
        <View className="flex-1 flex-col px-4 pt-4">
            <View className="flex flex-row items-center justify-between">
                <UserProfileBeranda
                    name={profile?.nama_lengkap}
                    image={profile?.fotoProfil}
                />
                <TouchableOpacity>
                    <Notification />
                </TouchableOpacity>

            </View>
            <View className="bg-white flex items-center justify-center rounded-xl mt-6">
                <NewsCarousel />
            </View>
            <View className="flex flex-row items-center justify-between gap-5 mt-4">
                <CardButton
                    icon={<Visit />}
                    title={"Kunjungan"}
                    path="/dokter/kunjungan"
                />
                <CardButton
                    icon={<MedicalHistory />}
                    title={"Pasien"}
                    path="/dokter/pasien"
                />
            </View>
        </View>
    )
}
