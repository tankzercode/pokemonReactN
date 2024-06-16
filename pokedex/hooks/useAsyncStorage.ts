import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';



const useAsyncStorage = () => {

    // const addTask = async () => {
    //     try {
    //       await AsyncStorage.setItem(
    //         '@MySuperStore:key',
    //         'I like to save it.',
    //       );
    //     } catch (error) {
    //       // Error saving data
    //     }
    //   };


    const [data, setData] = useState([])


    useEffect(() => {
        const getStorage = async function () {
            const storagedata = await AsyncStorage.getItem("1")
            console.log(storagedata)
            //  setData(prev=> [...prev, storagedata])
        }
    }, [])

    const setValue = async (value: any) => {
        await AsyncStorage.setItem(JSON.stringify(data.length), JSON.stringify(value))
    }


    return { data, setValue }

}

export { useAsyncStorage }