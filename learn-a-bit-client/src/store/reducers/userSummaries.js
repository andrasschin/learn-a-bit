import { ADD_USER_SUMMARY, LOAD_USER_SUMMARIES, REMOVE_USER_SUMMARY } from "../actionTypes";

export default (state=[], action) => {
    switch(action.type){
        case LOAD_USER_SUMMARIES:
            return [...action.summaries];
        
        case ADD_USER_SUMMARY:
            return [...state, action.summary];

        case REMOVE_USER_SUMMARY:
            return state.filter(summary => {
                return summary._id !== action.id
            });
        
        default:
            return state;
    }
}