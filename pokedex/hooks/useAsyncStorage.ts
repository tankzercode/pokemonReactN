import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface storageProp {
  key?: string,
  value?: any
}

export const useAsyncStorage = ({ key, value }: storageProp) => {
  const [storedValue, setStoredValue] = useState<any>([]);

  const addItem = async (param: { title: string, description: string, date: string }) => {
    await AsyncStorage.setItem(JSON.stringify(storedValue.length), JSON.stringify(param))
  }

  useEffect(() => {
    const load = async () => {
      const key = await AsyncStorage.getAllKeys()
      const data = await AsyncStorage.multiGet(key)
      setStoredValue(data)
    }
    load();
  }, [storedValue])

  // const getStoredItem = useCallback(async () => {
  //   try {
  //     if (key) {
  //       const item = await AsyncStorage.getAllKeys();
  //       console.log(item)
  //       setStoredValue([...item]);
  //     }

  //   } catch (error) {
  //     console.error('Error reading from AsyncStorage:', error);
  //   }
  // }, [key, value]);

  // const setStoredItem = async (value: any) => {
  //   try {
  //     const valueToStore = value instanceof Function ? value(storedValue) : value;
  //     setStoredValue(valueToStore);
  //     if (key) {

  //       await AsyncStorage.setItem(storedValue.length, JSON.stringify(valueToStore));

  //     }
  //   } catch (error) {
  //     console.error('Error writing to AsyncStorage:', error);
  //   }
  // };



  return { storedValue, addItem };
};