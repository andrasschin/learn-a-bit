import { LOAD_SUMMARIES } from "../actionTypes";

const DEFAULT_STATE = {
    summaries: []
}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case LOAD_SUMMARIES:
            return [...action.summaries];
        
        default:
            return state;
    }
}