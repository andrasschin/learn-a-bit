import { LOGOUT_USER } from "../actionTypes";
import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import channels from "./channels";

const appReducer = combineReducers({
    currentUser,
    channels,
    errors
})

const rootReducer = (state, action) => {
    if (action.type === LOGOUT_USER){
        return appReducer(undefined, action);
    }

    return appReducer(state, action);
}

export default rootReducer;