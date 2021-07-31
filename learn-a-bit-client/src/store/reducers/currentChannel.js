import { SET_CURRENT_CHANNEL } from "../actionTypes"

const DEFAULT_STATE = {}

export default (state=DEFAULT_STATE, action) => {
    switch(action.type){
        
        case SET_CURRENT_CHANNEL:
            return {
                ...state,
                ...action.channel
            }
        
        default:
            return state;
    }
}