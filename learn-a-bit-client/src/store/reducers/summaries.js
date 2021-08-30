import { LOAD_SUMMARIES, UPDATE_SUMMARY_WITH_UPDOOT } from "../actionTypes";

const DEFAULT_STATE = {
    summaries: []
}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        case LOAD_SUMMARIES:
            return [...action.summaries];
        
        case UPDATE_SUMMARY_WITH_UPDOOT:
            let newState = [...state ];
            let summaryIdx = state.findIndex(summary => {
                return summary._id === action.id;
            });
            newState[summaryIdx].updoots = action.updootsArray;
            
            return newState;

        default:
            return state;
    }
}