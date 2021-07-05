import { ADD_ERROR, REMOVE_ERROR } from "../actionTypes";

export function addError(error){
    return {
        type: ADD_ERROR,
        error
    }
}

export function removeError(){
    return {
        type: REMOVE_ERROR
    }
}