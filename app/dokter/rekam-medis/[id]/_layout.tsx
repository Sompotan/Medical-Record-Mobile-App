import {Tabs} from "expo-router";
import {Home, HomeOutline} from "@/app/icons";
import CustomTabBar from "@/components/common/CustomTabBar";



export default function TabsLayout() {
    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarPosition: "top",

            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Subjective",

                }}
            />
            <Tabs.Screen
                name="objective"
                options={{
                    title: "Objective",

                }}
            />
            <Tabs.Screen
                name="assessment"
                options={{
                    title: "Assessment",

                }}
            />
            <Tabs.Screen
                name="planning"
                options={{
                    title: "Planning",

                }}
            />
        </Tabs>
    )
}