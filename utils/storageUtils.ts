import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocalUserId = async () => {
    try {
        return await getFromStorage('userId');
    } catch (error) {
        console.error('Failed to load user id:', error);
        return null;
    }
};

export const getLocalAuthToken = async () => {
    try {
        const isAvailable = await isSecureStorageAvailable();
        if (isAvailable) {
            return await getFromSecureStorage('authToken');
        }
        return getFromStorage('authToken');
    } catch (error) {
        console.error('Failed to load auth token:', error);
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