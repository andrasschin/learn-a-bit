import { LOAD_UPDOOTED_SUMMARIES, ADD_UPDOOTED_SUMMARY, REMOVE_UPDOOTED_SUMMARY, UPDATE_USER_SUMMARY_WITH_UPDOOT } from "../actionTypes";

// eslint-disable-next-line
export default (state=[], action) => {
    switch(action.type){
        case LOAD_UPDOOTED_SUMMARIES:
           return [...action.summaries];
        
        case ADD_UPDOOTED_SUMMARY:
            return [...state, action.summary];
        
        case REMOVE_UPDOOTED_SUMMARY:
            return state.filter(summary => {
                return summary._id !== action.summary._id
            });

        case UPDATE_USER_SUMMARY_WITH_UPDOOT:
            let newState = [ ...state ];
            let summaryIdx = state.findIndex(summary => {
                return summary._id === action.payload.id;
            });
            newState[summaryIdx].updoots = action.payload.updootsArray;
            newState[summaryIdx].updootsCount = action.payload.updootsCount;
            
            return newState;

        default:
            return state;
    }
}