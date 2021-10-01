import axios from "axios";

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, url, data) {
    return new Promise((resolve, reject) => {
        axios[method.toLowerCase()](url, data)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.response.data.error);
            })
    })
}