import API from "@/services/api";

export const getAgamaList= async () => {
    const response = await API.get("/agama")
    return response.data;
}

export const getPendidikanList = async () => {
    const response = await API.get("/pendidikan")
    return response.data;
}

export const getStatusPerkawinanList = async  () => {
    const response = await API.get("/status-perkawinan")
    return response.data;
}

export const getStatusPembiayaanList =  async () => {
    const response = await API.get("/status-pembiayaan")
    return response.data;
}