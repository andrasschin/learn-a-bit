import axios from "axios";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout(){
    return dispatch => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
    }
}

export function authUser(userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/signin", userData)
                .then(res => {
                    if (res.status === 200) {
                        console.log("[SIGNIN] Response is ok.");
                        return res.data;
                    } else {
                        console.log("[SIGNIN] Response is not ok.");
                        return {};
                    }
                })
                .then((userData) => {
                    localStorage.setItem("jwtToken", userData.token);
                    dispatch(setCurrentUser(userData));
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    console.log("[SIGNIN] ERROR: ", err.response.data.error.message);
                    dispatch(addError(err.response.data.error.message));
                    reject();
                });
        })
    }
}

export function signUpUser(userData){
    return dispatch => {
        return new Promise((resolve, reject) => {
            axios.post("/api/auth/signup", userData)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem("jwtToken", userData.token);
                        dispatch(setCurrentUser(userData));
                        dispatch(removeError());
                        resolve();
                    }
                })
                .catch(err => {
                    console.log("[SIGNUP] ERROR: ", err.message);
                    dispatch(addError(err.response.data.error.message));
                    reject();
                })
        })
    }
}

// ! depreciated
/* export function authUser(userData) {
    return (dispatch) => {
        return fetch("/api/auth/signin", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify(userData),
        })
            .then((res) => {
                if (res.ok) {
                    console.log("res is ok");
                    return res.json();
                } else {
                    console.log("res is NOT ok");
                    return {};
                }
            })
            .then((userInfo) => {
                localStorage.setItem("jwtToken", userInfo.token);
                dispatch(setCurrentUser(userInfo));
            })
            .catch((err) => console.log("ERROR: ", err));
    };
} */