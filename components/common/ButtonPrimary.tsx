import { Text, ActivityIndicator, TouchableOpacity, TouchableOpacityProps} from "react-native";

interface ButtonPrimaryProps extends TouchableOpacityProps {
    title: string;
    loading?: boolean;
}

export default function ButtonPrimary({title, loading, ...props}: ButtonPrimaryProps) {
    return(
        <TouchableOpacity
            {...props}
            className={`w-full bg-black rounded-md p-4 items-center ${props.disabled ? "opacity-50" : ""}`}
            disabled={loading || props.disabled}
        >
            {
                loading ? (
                    <ActivityIndicator color="#FFF"/>
                ) : (
                    <Text className="text-white font-semibold text-base">{title}</Text>
                )
            }
        </TouchableOpacity>
    )
}