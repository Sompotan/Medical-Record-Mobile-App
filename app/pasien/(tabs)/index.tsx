import {View} from "react-native";
import UserProfileBeranda from "@/components/pasien/UserProfileBeranda";
import {Notification} from "@/app/icons";
import NewsCarousel from "@/components/pasien/NewsCarousel";
import CardButton from "@/components/pasien/CardButton";
import {MedicalHistory, Visit} from "@/assets";

export default function Beranda() {
    return (
        <View className="flex-1 flex-col px-4 pt-4">
            <View className="flex flex-row items-center justify-between">
                <UserProfileBeranda />
                <Notification />
            </View>
            <View className="bg-white flex items-center justify-center rounded-xl mt-6">
                <NewsCarousel />
            </View>
            <View className="flex flex-row items-center justify-between gap-5 mt-4">
                <CardButton
                    icon={<Visit/>}
                    title={"Daftar Kunjungan"}
                />
                <CardButton
                    icon={<MedicalHistory/>}
                    title={"Rekam Medis"}
                />
            </View>
        </View>
    )
}
