import {View, Text} from "react-native";
import CardProfileInfoItem from "@/components/pasien/CardProfileInfoItem";

export type CardProfileInfoProps = {
    nik: string;
    gender: string;
    tanggal_lahir: string;
    nomor_handphone: string;
}

export default function CardProfileInfo({nik, gender, tanggal_lahir, nomor_handphone}: CardProfileInfoProps) {
    return(

            <View className="flex flex-col bg-white p-4 rounded-lg border border-gray-300">
                <Text className="text-2xl font-semibold mb-3">Info Profil</Text>
                <View className="gap-5">
                    <CardProfileInfoItem title="NIK" value={nik} />
                    <CardProfileInfoItem title="Jenis Kelamin" value={gender} />
                    <CardProfileInfoItem title="Tanggal Lahir" value={tanggal_lahir} />
                    <CardProfileInfoItem title="Nomor Telepon" value={nomor_handphone} />
                </View>

            </View>

    )
}