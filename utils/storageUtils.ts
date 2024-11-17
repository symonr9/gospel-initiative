import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NewUserStep } from '@/enums/enums';

export const getLocalNewUserStep = async () => {
    try {
        return await getFromStorage('newUserStep');
    } catch (error) {
        console.error('Failed to load local new user step:', error);
        return null;
    }
};

export const setLocalNewUserStep = async (newUserStep: NewUserStep) => {
    try {
        await saveToStorage("newUserStep", newUserStep.toString());
    } catch (error) {
        console.error('Failed to save local new user step:', error);
    }
}

export const getLocalUserId = async () => {
    try {
        return await getFromStorage('userId');
    } catch (error) {
        console.error('Failed to load user id:', error);
        return null;
    }
};

export const getLocalAccessToken = async () => {
    try {
        const isAvailable = await isSecureStorageAvailable();
        if (isAvailable) {
            return await getFromSecureStorage('accessToken');
        }
        return getFromStorage('accessToken');
    } catch (error) {
        console.error('Failed to load access token:', error);
    }
    return null;
};

export const getLocalRefreshToken = async () => {
    try {
        const isAvailable = await isSecureStorageAvailable();
        if (isAvailable) {
            return await getFromSecureStorage('refreshToken');
        }
        return getFromStorage('refreshToken');
    } catch (error) {
        console.error('Failed to load refresh token:', error);
    }
    return null;
};

export async function saveToStorage(key: string, value: any) {
    await AsyncStorage.setItem(key, value);
}

export async function getFromStorage(key: string) {
    return await AsyncStorage.getItem(key);
}

export async function saveToSecureStorage(key: string, value: any) {
    await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStorage(key: any) {
    return await SecureStore.getItemAsync(key);
}

export async function isSecureStorageAvailable() {
    return await SecureStore.isAvailableAsync();
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear();

        const isAvailable = await isSecureStorageAvailable();
        if (isAvailable) {
            await SecureStore.deleteItemAsync('accessToken');
            await SecureStore.deleteItemAsync('refreshToken');
            await SecureStore.deleteItemAsync('userId');
        }
    } catch (error) {
        console.error('Error clearing storage:', error);
    }
};