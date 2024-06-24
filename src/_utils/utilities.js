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

const checkIsValidUsername = (username) => {
    return /^[a-z][^A-Z]{4,}$/.test(username);
}

/**
 * 
 * @param {string} dateStr Get the fully formatted Date with the timezone until seconds and return the formatted date
 */
const formatDate = (dateStr) => {
    // NOTE: the function will display the date in the zone of the respective user's timezone and in the format of YYYY-MM-DD HH:MM:SS
    const fullDate = new Date(dateStr);
    return `${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()} ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`
};

export {
    useDebounce,
    checkIsValidUsername,
    formatDate
}