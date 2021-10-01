import { apiCall } from "../../services/api";
import { API_ROUTES, getApiRoute } from "../../helpers/apiRoutes";
import { SET_CURRENT_USER, LOGOUT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";
import { setAuthorizationToken } from "../../services/api";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export function logout(){
    return {
        type: LOGOUT_USER
    }
}

export function logoutUser(){
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(logout());
    }
}

export function authUser(userData){
    return dispatch => {
        const PATH = getApiRoute(API_ROUTES.AUTH.LOGIN);

        return new Promise((resolve, reject) => {
            return apiCall("POST", PATH, userData)
                .then((userData) => {
                    localStorage.setItem("jwtToken", userData.token);
                    setAuthorizationToken(userData.token);
                    dispatch(setCurrentUser(userData));
                    resolve();
                })
                .catch(err => {
                    console.log("[SIGNIN] ERROR: ", err.message);
                    dispatch(addError(err.message));
                    reject();
                });
        })
    }
}

export function signUpUser(newUserData){
    return dispatch => {
        const path = getApiRoute(API_ROUTES.AUTH.REGISTER);

        return new Promise((resolve, reject) => {
            apiCall("POST", path, newUserData)
                .then(newUser => {
                    localStorage.setItem("jwtToken", newUser.token);
                    setAuthorizationToken(newUser.token);
                    dispatch(setCurrentUser(newUser));
                    resolve();
                })
                .catch(err => {
                    console.log("[SIGNUP] ERROR: ", err.message);
                    dispatch(addError(err.message));
                    reject();
                })
        })
    }
}