import {SubjectiveNotePayload} from "@/types/rekam-medis/types";
import API from "@/services/api";

export const autoSaveSubjectiveNote = async (rekamMedisId: string, data: SubjectiveNotePayload) => {
    return await API.patch(`/dokter/rekam-medis/${rekamMedisId}/subjective`, data)
}

export const getSubjectiveNote = async (rekamMedisId: string) => {
    const res = await API.get(`/dokter/rekam-medis/${rekamMedisId}/subjective`)
    return res.data;
}