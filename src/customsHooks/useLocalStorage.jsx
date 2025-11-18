import {useEffect, useState} from "react";


export default function useLocalStorage(key, initialValue) {

    const [value, setValue] = useState(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSON.parse(stored) : initialValue;
        } catch (e) {
            throw new e;
        }
    });

    useEffect(() => {
        console.log(value);
        localStorage.setItem(key, JSON.stringify(value));

    }, [value, key]);

    return [value, setValue];

}