import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import channels from "./channels";

const rootReducer = combineReducers({
    currentUser,
    channels,
    errors
})

export default rootReducer;