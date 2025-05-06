import {Tabs} from "expo-router";
import {History, HistoryOutline, Home, HomeOutline, MaleUser, MaleUserOutline} from "@/app/icons";

export default function PasienTabLayout() {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: "black",
            headerShown: false
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Beranda",
                    tabBarIcon: ({ color, focused }) => focused ? <Home color={color} /> : <HomeOutline color={color} />,
                }}
            />
            <Tabs.Screen
                name="riwayat"
                options={{
                    title: "Riwayat",
                    tabBarIcon: ({ color, focused }) => focused ? <History color={color} /> : <HistoryOutline color={color} />
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profil",
                    tabBarIcon: ({ color, focused }) => focused ? <MaleUser color={color}/> : <MaleUserOutline color={color}/>
                }}
            />
        </Tabs>
    )
}