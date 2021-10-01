import { apiCall } from "../../services/api";
import { API_ROUTES, getApiRoute } from "../../helpers/apiRoutes";
import { LOAD_UPDOOTED_SUMMARIES, 
    ADD_UPDOOTED_SUMMARY, 
    REMOVE_UPDOOTED_SUMMARY, 
    UPDATE_SUMMARY_WITH_UPDOOT, 
    UPDATE_USER_SUMMARY_WITH_UPDOOT } from "../actionTypes";

function loadUpdootedSummaries(summaries){
    return {
        type: LOAD_UPDOOTED_SUMMARIES,
        summaries
    }
}

function addUpdootedSummary(summary) {
    return {
        type: ADD_UPDOOTED_SUMMARY,
        summary
    }
}

function removeUpdootedSummary(summary) {
    return {
        type: REMOVE_UPDOOTED_SUMMARY,
        summary
    }
}

export function updateSummaryWithUpdoot(payload){
    return {
        type: UPDATE_SUMMARY_WITH_UPDOOT,
        payload
    }
}

export function updateUpdootedSummaryWithUpdoot(payload){
    return {
        type: UPDATE_USER_SUMMARY_WITH_UPDOOT,
        payload
    }
}

export function getUpdootedSummaries() {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.UPDOOTED_SUMMARIES.GET, userId);

        return new Promise((resolve, reject) => {
            apiCall("GET", path)
                .then(updootedSummaries => {
                    dispatch(loadUpdootedSummaries(updootedSummaries))
                    resolve();
                })
                .catch(err => {
                    console.log("[GETUPDOOTEDSUMMARIES]: ", err.message);
                    reject();
                })
        })
    }
}

export function postUpdootToSummary(summaryId, actionCreator) {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;
        const summaryToBeUpdooted = {
            summary_id: summaryId
        }

        const path = getApiRoute(API_ROUTES.UPDOOTED_SUMMARIES.POST, userId);

        return new Promise((resolve, reject) => {
            apiCall("POST", path, summaryToBeUpdooted)
                .then(updootedSummary => {
                    dispatch(addUpdootedSummary(updootedSummary));
                    dispatch(actionCreator({
                        id: updootedSummary._id,
                        updootsArray: updootedSummary.updoots,
                        updootsCount: updootedSummary.updootsCount
                    }));
                    resolve();
                })
                .catch(err => {
                    console.log("[postUpdootToSummary]: ", err.message)
                    reject();
                })
        })
    }
}

export function deleteUpdootFromSummary(summaryId, actionCreator) {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.UPDOOTED_SUMMARIES.DELETE, userId, summaryId);

        return new Promise((resolve, reject) => {
            apiCall("DELETE", path)
                .then(removedUpdootSummary => {
                    dispatch(removeUpdootedSummary(removedUpdootSummary));
                    dispatch(actionCreator({
                        id: removedUpdootSummary._id,
                        updootsArray: removedUpdootSummary.updoots,
                        updootsCount: removedUpdootSummary.updootsCount
                    }))
                    resolve();
                })
                .catch(err => {
                    console.log("[deleteUpdootFromSummary]: ", err.message);
                    reject();
                })
        })
    }
}