import { ADD_SUMMARY, LOAD_SUMMARIES, REMOVE_SUMMARY } from "../actionTypes";

const DEFAULT_STATE = {
    summaries: []
}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case LOAD_SUMMARIES:
            return [...action.summaries];
        
        case ADD_SUMMARY:
            return [...state, action.summary];

        case REMOVE_SUMMARY:
            return state.summaries.filter(summary => {
                return summary._id !== action.id
            });
        
        default:
            return state;
    }
}