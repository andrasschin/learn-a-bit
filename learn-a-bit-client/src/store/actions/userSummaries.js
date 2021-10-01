import { apiCall } from "../../services/api";
import { API_ROUTES, getApiRoute } from "../../helpers/apiRoutes";
import { LOAD_USER_SUMMARIES, ADD_USER_SUMMARY, REMOVE_USER_SUMMARY } from "../actionTypes";
import { addError } from "../actions/errors";

function loadSummaries(summaries){
    return {
        type: LOAD_USER_SUMMARIES,
        summaries
    }
}

function addSummary(summary){
    return {
        type: ADD_USER_SUMMARY,
        summary
    }
}

function removeSummary(id){
    return {
        type: REMOVE_USER_SUMMARY,
        id
    }
}

export function getSummaries(){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.USER_SUMMARIES.GET, userId);

        return new Promise((resolve, reject) => {
            apiCall("GET", path)
                .then(userSummaries => {
                    dispatch(loadSummaries(userSummaries))
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] GETSUMMARIES: ", err.message);
                    reject();
                })
        })
    }
}

export function postSummary(newSummaryData){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.USER_SUMMARIES.POST, userId);

        return new Promise((resolve, reject) => {
            apiCall("POST", path, newSummaryData)
                .then(newSummary => {
                    dispatch(addSummary(newSummary));
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] POSTSUMMARY: ", err);
                    dispatch(addError("Something went wrong :("));
                    reject();
                })
        })
    }
}

export function deleteSummary(summaryId){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;
        
        const path = getApiRoute(API_ROUTES.USER_SUMMARIES.DELETE, userId, summaryId);

        return new Promise((resolve, reject) => {
            apiCall("DELETE", path)
                .then(() => {
                    dispatch(removeSummary(summaryId));
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] DELETESUMMARY: ", err.message);
                    reject();
                })
        })
    }
}