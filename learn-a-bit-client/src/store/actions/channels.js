import { apiCall } from "../../services/api";
import { API_ROUTES, getApiRoute } from "../../helpers/apiRoutes"
import { ADD_CHANNEL, LOAD_CHANNELS, REMOVE_CHANNEL } from "../actionTypes";

function loadChannels(channels){
    return {
        type: LOAD_CHANNELS,
        channels
    }
}

function addChannel(channel){
    return {
        type: ADD_CHANNEL,
        channel
    }
}

function removeChannel(id){
    return {
        type: REMOVE_CHANNEL,
        id
    }
}

export function getChannels(){
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.CHANNELS.GET, userId);

        return apiCall("GET", path)
            .then(channels => dispatch(loadChannels(channels)))
    }
}

export function postChannel(newChannelData){
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.CHANNELS.POST, userId);

        return new Promise((resolve, reject) => {
            apiCall("POST", path, newChannelData)
                .then(newChannel => {
                    dispatch(addChannel(newChannel))
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] POSTCHANNEL: ", err.message);
                    reject();
                })
        })
    }
}

export function deleteChannel(channelId){
    return (dispatch, getState) => {
        let { currentUser } = getState();
        const userId = currentUser.user.id;

        const path = getApiRoute(API_ROUTES.CHANNELS.DELETE, userId, channelId);

        return new Promise((resolve, reject) => {
            apiCall("DELETE", path)
                .then(() => {
                    dispatch(removeChannel(channelId));
                    resolve();
                })
                .catch(err => {
                    console.log("[ERROR] DELETECHANNEL: ", err.message);
                    reject();
                })
        })
    }
}