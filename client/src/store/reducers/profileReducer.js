import { PROFILE_RESET_ERRORS, SET_PROFILE_ERROR } from "../constants/ProfileConstant"

const initState = {
    
    updateErrors :[],
}


export const updateName =(state = initState, action)=>{
    const {type, payload}  = action
    if(type === SET_PROFILE_ERROR){
        return {
            ...state,
            updateErrors: payload
        }

}else if(type === PROFILE_RESET_ERRORS){
    return {
        ...state,
        updateErrors : []
    }
}
    else{
        return state

    }
}