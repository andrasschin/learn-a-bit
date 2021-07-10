import { LOAD_CHANNELS, REMOVE_CHANNEL } from "../actionTypes"

const DEFAULT_STATE = {
    channels: []
}

export default (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOAD_CHANNELS:
            return [...action.channels]
    
        default:
            return state;
    }
}