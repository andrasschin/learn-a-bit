import axios from "axios";
import { LOAD_SUMMARIES, ADD_SUMMARY, REMOVE_SUMMARY} from "../actionTypes";

function loadSummaries(summaries){
    return {
        type: LOAD_SUMMARIES,
        summaries
    }
}

function addSummary(summary){
    return {
        type: ADD_SUMMARY,
        summary
    }
}

function removeSummary(id){
    return {
        type: REMOVE_SUMMARY,
        id
    }
}

export function getSummaries(){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const id = currentUser.user.id;

        return new Promise((resolve, reject) => {
            axios.get(`/api/users/${id}/summaries`)
                .then(res => {
                    dispatch(loadSummaries(res.data))
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] GETSUMMARIES: ", err);
                    reject();
                })
        })
    }
}

export function deleteSummary(id){
    return (dispatch, getState) => {
        const { currentUser } = getState();
        const userId = currentUser.user.id;
        
        return new Promise((resolve, reject) => {
            axios.delete(`/api/users/${userId}/summaries/${id}`)
                .then(() => {
                    dispatch(removeSummary(id));
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] DELETESUMMARY: ", err);
                    reject();
                })
        })
    }
}