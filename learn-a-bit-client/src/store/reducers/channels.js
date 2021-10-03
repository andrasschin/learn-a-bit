import { LOAD_CHANNELS, ADD_CHANNEL, REMOVE_CHANNEL } from "../actionTypes"

// eslint-disable-next-line
export default (state=[], action) => {
    switch (action.type) {
        case LOAD_CHANNELS:
            return [...action.channels]
        
        case ADD_CHANNEL:
            return [...state, action.channel];
        
        case REMOVE_CHANNEL:
            return state.filter(channel => {
                return channel._id !== action.id
            })

        default:
            return state;
    }
}