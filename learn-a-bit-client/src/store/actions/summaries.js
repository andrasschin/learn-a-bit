import { LOAD_SUMMARIES, UPDATE_SUMMARY_WITH_UPDOOT } from "../actionTypes";
import axios from "axios";

function loadSummaries(summaries){
    return {
        type: LOAD_SUMMARIES,
        summaries
    }
}

function updateSummaryWithUpdoot(payload){
    return {
        type: UPDATE_SUMMARY_WITH_UPDOOT,
        payload
    }
}

export function getSummaries(sortByParams, customSearchParams){
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get("/api/summaries", {
                params: {
                    sortByParams,
                    customSearchParams
                }
            })
                .then(res => {
                    dispatch(loadSummaries(res.data));
                    resolve();
                })
                .catch(err => {
                    console.log("[GETSUMMARIES]: ", err);
                    reject();
                })
        })
    }
}

export function switchUpdootOnSummary(summaryId){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;
        const data = {
            user_id: userId,
            summary_id: summaryId
        }
        return new Promise((resolve, reject) => {
            axios.post("/api/summaries", data)
                .then(res => {
                    dispatch(updateSummaryWithUpdoot({
                        id: summaryId, 
                        updootsArray: res.data.updoots,
                        updootsCount: res.data.updootsCount
                    }));
                    resolve();
                })
                .catch(err => {
                    console.log("[SWITCHUPDOOT]", err);
                    reject();
                })
        })
    }
}