import {ObjectiveNoteForm, SubjectiveNotePayload} from "@/types/rekam-medis/types";
import API from "@/services/api";

export const autoSaveSubjectiveNote = async (rekamMedisId: string, data: SubjectiveNotePayload) => {
    const res =  await API.patch(`/dokter/rekam-medis/${rekamMedisId}/subjective`, data)
    return res.data;
}

export const getSubjectiveNote = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/subjective`)
    return res.data;
}

export const autoSaveObjectiveNote = async (rekamMedisId: string, data: ObjectiveNoteForm)=> {
    console.log("[DEBUG] 🛰️ PATCH objective:", data);

    const res =  await API.patch(`/dokter/rekam-medis/${rekamMedisId}/objective`, data)
    return res.data;
}

export const getObjectiveNote = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/objective`)
    return res.data;
}

export const fetchKodeKlinis = async (search: string) => {
    if (!search || search.length < 2) return [];

    try {
        const res = await API.get(`/kode-klinis?search=${encodeURIComponent(search)}`);
        return res.data;
    } catch (error) {
        console.error("[fetchKodeKlinis] Gagal mengambil data kode klinis:", error)
        return [];
    }

}

export const getAssessmentNote = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/assessment`)
    return res.data;
}

export const autoSaveAssessmentNote = async (rekamMedisId: string, data: any) => {
    const res = await API.patch(`/dokter/rekam-medis/${rekamMedisId}/assessment`, data)
    return res.data;
}

export const getPlanningNote = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/planning`)
    return res.data;
}

export const autoSavePlanningNote = async (rekamMedisId: string, data: any) => {
    const res = await API.patch(`/dokter/rekam-medis/${rekamMedisId}/planning`, data)
    return res.data;
}