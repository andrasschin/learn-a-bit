import { LOAD_CHANNELS, ADD_CHANNEL } from "../actionTypes"

const DEFAULT_STATE = {
    channels: []
}

export default (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOAD_CHANNELS:
            return [...action.channels]
        
        case ADD_CHANNEL:
            return [...state, action.channel];
        
        default:
            return state;
    }
}