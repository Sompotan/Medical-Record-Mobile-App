import {getHealthNews} from "@/services/newsService";
import {useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, Linking, TouchableOpacity, View, Image, Text} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window")

export default function NewsCarousel() {
    const [articles, setArticles] = useState<Articles[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const results = await getHealthNews();
                setArticles(results);
            } catch (error) {
                console.error("Error fetching news:", error)
            } finally {
                setLoading(false);
            }
        }

        fetchNews();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#2563EB"/>
            </View>
        )
    }


    return(
            <Carousel
                width={width * 0.9}
                height={300}
                autoPlay
                loop
                data={articles}
                autoPlayInterval={4000}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={({item}) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => Linking.openURL(item.link)}
                        className="rounded-xl p-6"
                    >
                        {item.image_url && (
                            <Image
                                source={{uri: item.image_url}}
                                className="w-full h-36 rounded-lg mb-3"
                                resizeMode="cover"
                            />
                        )}
                        <Text className="text-lg font-bold text-black">{item.title}</Text>
                        <Text className="text-sm text-gray-500 mt-1">
                            {item.description?.slice(0,100)}...
                        </Text>
                        <Text className="text-xs text-gray-400 mt-1">
                            {new Date(item.pubDate).toLocaleDateString("id-ID")}
                        </Text>
                    </TouchableOpacity>
                )}
            />
    )
}