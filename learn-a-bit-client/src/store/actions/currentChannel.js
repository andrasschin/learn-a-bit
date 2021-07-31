import { SET_CURRENT_CHANNEL } from "../actionTypes";

export function setCurrentChannel(channel){
    return {
        type: SET_CURRENT_CHANNEL,
        channel
    }
}