import {DiagnosisEntry} from "@/app/dokter/rekam-medis/[id]/assessment";
import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";
import {autoSaveAssessmentNote} from "@/services/rekamMedisAPI";
import debounce from "lodash/debounce"

export function useAutoSaveAssessment(diagnosisList: DiagnosisEntry[]) {
    const {id: rekamMedisId} = useLocalSearchParams();

    useEffect(() => {
        const save = async () => {
            if (!rekamMedisId) return;

            try {
                await autoSaveAssessmentNote(rekamMedisId as string, {diagnosisPasien: diagnosisList})
                console.log("[DEBUG] Autosave Assessment berhasil");
            } catch (error) {
                console.error("[ERROR Autosave Assessment Gagal: )", error)
            }

        }

        const debonced = debounce(save, 1200);
        debonced();

        return () => debonced.cancel()

    }, [diagnosisList]);
}