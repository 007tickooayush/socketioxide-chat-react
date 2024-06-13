import { useEffect, useState } from "react"

/**
 * 
 * @param {object} val object value
 * @param {number} delay number of seconds to delay
 * @returns {object}
 */
const useDebounce = (val, delay) => {
    const [value, setValue] = useState(val);

    useEffect(() => {
        let timeout = setTimeout(() => {
            setValue(val);
        }, delay);

        return () => {
            clearTimeout(timeout);
        }

    }, [val, delay]);

    return value;
}

export {
    useDebounce
}