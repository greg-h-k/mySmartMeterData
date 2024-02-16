import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadData = async (key: string) => {
    // read stored data or return null 
    try  {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      console.log(e)
    }
}

export const loadValue = async (key: string) => {
    // read stored data or return null 
    try  {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch (e) {
      console.log(e)
    }
}

export const storeValue = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
}

export const storeObject = async (key: string, value: object) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e)
    }
}
