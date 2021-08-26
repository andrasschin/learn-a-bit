import { LOAD_SUMMARIES } from "../actionTypes";
import axios from "axios";

function loadSummaries(summaries){
    return {
        type: LOAD_SUMMARIES,
        summaries
    }
}

export function getSummaries(){
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            axios.get("/api/summaries")
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