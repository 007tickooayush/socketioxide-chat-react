import axios from "axios";

const serverApiUrl = import.meta.env.VITE_SERVER_SERVER_URL + '/api';

export const checkUserExists = async (username) => {
    try {
        const response = await fetch(`${serverApiUrl}/check-username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, generated_username: "" })
        });
        
        if(response.status === 302) {
            const data = await response.json();
            console.log('api data :>> ', data);
            return data;
        } else {
            return { exists: false, username: "user not found" }
        }

        // Axios throws error as the response status is 302 if username is found
        // const resp = await axios.post(`${serverApiUrl}/check-username`, { username, generated_username: "" }).then((response) => {
        //     response.status === 302 ? response : { exists: false, username: "user not found" }
        // }).catch((error) => {
        //     console.error('error :>> ', error);
        //     return { exists: false, error: error.message };
        // });
        // console.log('resp.data :>> ', resp.data);

    } catch (error) {
        console.error('Error occured [checkUserExists] :>> ', error);
        return { exists: false, error: error.message };
    }

    // if (response.ok) {
    //     const data = await response.json();
    //     console.log('data :>> ', data);
    //     console.log('response :>> ', response);
    //     return data;
    // } else {
    //     return { exists: false, error: response.statusText }
    // }

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
    try {
        const response = await fetch(`${serverApiUrl}/`);
        if (response.ok) {
            const data = await response.text();
            console.log('data :>> ', data);
            return { message: data, status: response.status };
        } else {
            return { status: 500, error: response.status }
        }
    } catch (error) {
        return { status: 400, error: error.message }
    }
}