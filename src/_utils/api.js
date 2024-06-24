const serverApiUrl = import.meta.env.VITE_SERVER_SERVER_URL + '/api';

export const checkUserExists = async (username) => {
    const response = await fetch(`http://localhost:4040/api/check-username`, {
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