import { useEffect, useState } from "react"

/**
 * 
 * @param {object} val object value
 * @param {number} delay number of seconds to delay
 * @returns {object}
 */
export const useDebounce = (val, delay) => {
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

export const checkIsValidUsername = (username) => {
    return /^[a-z][^A-Z]{4,}$/.test(username);
}

/**
 * 
 * @param {string} dateStr Get the fully formatted Date with the timezone until seconds and return the formatted date
 */
export const formatDate = (dateStr) => {
    // NOTE: the function will display the date in the zone of the respective user's timezone and in the format of YYYY-MM-DD HH:MM:SS
    const fullDate = new Date(dateStr);
    return `${fullDate.getFullYear()}-${fullDate.getMonth() + 1}-${fullDate.getDate()} ${fullDate.getHours()}:${fullDate.getMinutes()}:${fullDate.getSeconds()}`
};

export const askPermitAndShowNotification = async (message) => {
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
        new Notification(message);
    } else if (Notification.permission !== "denied") {
        let permission = await Notification.requestPermission();
        if (permission === "granted") {
            new Notification(message);
        }
    }
}

// export {
//     useDebounce,
//     checkIsValidUsername,
//     formatDate
// }