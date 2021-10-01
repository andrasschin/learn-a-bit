import { apiCall } from "../../services/api";
import { API_ROUTES, getApiRoute } from "../../helpers/apiRoutes";
import { LOAD_SUMMARIES } from "../actionTypes";

function loadSummaries(summaries){
    return {
        type: LOAD_SUMMARIES,
        summaries
    }
}

export function getSummaries(sortByParams, customSearchParams){
    return (dispatch) => {
        const path = getApiRoute(API_ROUTES.SUMMARIES.GET);
        const paramsObj = {
            params: {
                sortByParams,
                customSearchParams
            }
        }

        return new Promise((resolve, reject) => {
            apiCall("GET", path, paramsObj)
                .then(summaries => {
                    dispatch(loadSummaries(summaries));
                    resolve();
                })
                .catch(err => {
                    console.log("[GETSUMMARIES]: ", err.message);
                    reject();
                })
        })
    }
}