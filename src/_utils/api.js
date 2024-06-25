const serverApiUrl = import.meta.env.VITE_SERVER_SERVER_URL + '/api';

export const checkUserExists = async (username) => {
    const response = await fetch(`${serverApiUrl}/check-username`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, generated_username: "" })
    });

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log('data :>> ', data);
    //     console.log('response :>> ', response);
    //     return data;
    // } else {
    //     return { exists: false, error: response.statusText }
    // }

    const data = await response.json();
    return data;

}

// export const checkUserExists = (username) => {
//     return fetch(`${serverUrl}/check-username`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ username, generated_username: "" })
//     }).then(response => response.json())
// }

export const checkServerHealthHttp = async () => {
    const response = await fetch(`${serverApiUrl}/`);
    if (response.ok) {
        const data = await response.text();
        console.log('data :>> ', data);
        return { message: data, status: response.status };
    } else {
        return { status: 'error', error: response.status }
    }
}