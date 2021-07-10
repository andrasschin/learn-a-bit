import axios from "axios";
import { LOAD_CHANNELS, REMOVE_CHANNEL } from "../actionTypes";

function loadChannels(channels){
    return {
        type: LOAD_CHANNELS,
        channels
    }
}

export function getChannels(){
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const id = currentUser.user.id;
        return new Promise((resolve, reject) => {
            axios.get(`/api/users/${id}/sources/youtube-channels`)
                .then(res => {
                    dispatch(loadChannels(res.data));
                })
                .catch(err => {
                    console.log("[ERROR] GETCHANNELS: ", err.response.data.error.message)
                })
        })
    }
}