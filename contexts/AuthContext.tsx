import {createContext, ReactNode, useEffect, useState} from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

interface User {
    id: string;
    role: "pasien" | "dokter"
    token: string;
    isVerified: "belum"| "menunggu" | "verified";
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
    updateUser: (data: Partial<User>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await SecureStore.getItemAsync("user")
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error) {
                console.error("Error loading user: ", error);
            } finally {
                setLoading(false)
            }
        };

        loadUser();
    }, []);

    const login = async (userData: User) => {
        setUser(userData);
        await SecureStore.setItemAsync("user", JSON.stringify(userData))
        await SecureStore.setItemAsync("token", userData.token)
    }

    const logout = async () => {
        setUser(null);
        await SecureStore.deleteItemAsync("user");
        await SecureStore.deleteItemAsync("token")
        router.replace("/auth/login")
    }

    const updateUser = async (data: Partial<User>) => {
        if (!user) return;
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        await SecureStore.setItemAsync("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}