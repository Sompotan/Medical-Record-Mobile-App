import API from "@/services/api";

interface LoginResponse {
    id: string;
    role: "pasien" | "dokter";
    token: string;
    isVerified: "belum" | "menunggu" | "verified";
}

interface RegisterResponse {
    id: string;
    email: string;
    role: "pasien";
    isVerified: "belum" | "menunggu" | "verified";
    token: string;
}

interface RegisterRequest {
    email: string;
    password: string;
}

export const registerApi = async (payload: RegisterRequest): Promise<RegisterResponse> => {
    try {
        const response = await API.post("/auth/register", payload);
        return response.data;
    } catch (error: any) {
        console.error("[Register API Error]", error);
        throw new Error(error?.response?.data?.message || "Gagal daftar. Coba lagi.")
    }
}



export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await API.post("/auth/login", {
            email,
            password
        })
        return response.data
    } catch (error: any) {
        console.error("[Login API Error", error);
        throw new Error(error?.response?.data?.message || "Gagal login. Coba Lagi.")
    }
}

export const logoutApi = async (): Promise<void> => {
    try {
        await API.post("/auth/logout");
    } catch (error: any) {
        console.error("[Logout API Error]", error?.response?.data || error.message);
    }
}