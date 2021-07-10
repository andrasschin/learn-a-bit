import axios from "axios";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function setAuthorizationToken(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common;
    }
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