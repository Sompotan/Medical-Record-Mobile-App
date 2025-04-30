import * as SecureStore from "expo-secure-store";

const getKey = (step: number) => `form_step${step}_draft`;

export const saveStepDraft = async (step: number, data: any) => {
    await SecureStore.setItemAsync(getKey(step), JSON.stringify(data));
};

export const getStepDraft = async (step: number) => {
    const stored = await SecureStore.getItemAsync(getKey(step));
    return stored ? JSON.parse(stored) : null;
};

export const clearStepDraft = async (step: number) => {
    await SecureStore.deleteItemAsync(getKey(step));
};