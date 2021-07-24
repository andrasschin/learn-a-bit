import { LOAD_CHANNELS, ADD_CHANNEL, REMOVE_CHANNEL } from "../actionTypes"

const DEFAULT_STATE = {
    channels: []
}

export default (state=DEFAULT_STATE, action) => {
    switch (action.type) {
        case LOAD_CHANNELS:
            return [...action.channels]
        
        case ADD_CHANNEL:
            return [...state, action.channel];
        
        case REMOVE_CHANNEL:
            let newState = state.filter(channel => {
                return channel._id !== action.id
            })
            return newState;

        default:
            return state;
    }
}