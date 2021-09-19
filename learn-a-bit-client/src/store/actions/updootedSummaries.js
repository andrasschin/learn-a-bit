import axios from "axios";
import { LOAD_UPDOOTED_SUMMARIES, ADD_UPDOOTED_SUMMARY, REMOVE_UPDOOTED_SUMMARY, UPDATE_SUMMARY_WITH_UPDOOT, UPDATE_USER_SUMMARY_WITH_UPDOOT } from "../actionTypes";

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

        return new Promise((resolve, reject) => {
            axios.get(`/api/users/${userId}/updooted-summaries`)
                .then(res => {
                    dispatch(loadUpdootedSummaries(res.data))
                    resolve();
                })
                .catch(err => {
                    console.log("[GETUPDOOTEDSUMMARIES]: ", err);
                    reject();
                })
        })
    }
}

export function postUpdootToSummary(summaryId, actionCreator) {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;
        const data = {
            summary_id: summaryId
        }

        return new Promise((resolve, reject) => {
            axios.post(`/api/users/${userId}/updooted-summaries/`, data)
                .then((res) => {
                    const updootedSummary = res.data;

                    dispatch(addUpdootedSummary(updootedSummary));
                    dispatch(actionCreator({
                        id: updootedSummary._id,
                        updootsArray: updootedSummary.updoots,
                        updootsCount: updootedSummary.updootsCount
                    }));
                    resolve();
                })
                .catch(err => {
                    console.log("[postUpdootToSummary]: ", err)
                    reject();
                })
        })
    }
}

export function deleteUpdootFromSummary(summaryId, actionCreator) {
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;

        return new Promise((resolve, reject) => {
            axios.delete(`/api/users/${userId}/updooted-summaries/${summaryId}`)
                .then((res) => {
                    const removedUpdootSummary = res.data;

                    dispatch(removeUpdootedSummary(removedUpdootSummary));
                    dispatch(actionCreator({
                        id: removedUpdootSummary._id,
                        updootsArray: removedUpdootSummary.updoots,
                        updootsCount: removedUpdootSummary.updootsCount
                    }))
                    resolve();
                })
                .catch(err => {
                    console.log("[deleteUpdootFromSummary]: ", err);
                    reject();
                })
        })
    }
}