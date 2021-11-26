import jwt_decode from "jwt-decode";
import {SET_LODER, CLOSE_LODER, SET_TOKEN, REGISTER_ERROR, LOGOUT, LOGIN_ERROR} from '../constants/UserConstant'


const initalState = {
    loading: false,
    registerError: [],
    loginError: [],
    token:'',
    user:''
}


const verifyToken = token=>{
    if(token){
    const decodeToken = jwt_decode(token)
    // console.log(decodeToken)
    const expireIn = new Date(decodeToken.exp * 1000)
    if(new Date() > expireIn){
        localStorage.removeItem('myToken')
        return null;
    }
    else{
        return decodeToken
    }
    // else{
    //     initalState.token = token;
    //     const {user} = decodeToken
    //     // console.log(user)
    //     initalState.user = user
    // }
}
}

//decode the token in user
const token = localStorage.getItem('myToken')
if(token){
    const decoded =  verifyToken(token)
    if(decoded){
        initalState.token = token;
        const {user} = decoded
        initalState.user = user
    }

}


export const AuthReducer = (state = initalState, action) => {
    if (action.type === SET_LODER) {
        return {
            ...state,
            loading: true
        }
    }
    else if (action.type === CLOSE_LODER) {
        return {
            ...state,
            loading: false
        }
    }
    else if(action.type ===REGISTER_ERROR){
        return{
            ...state,
            registerError: action.payload
        }
    }
    else if(action.type === SET_TOKEN){
        const decoded= verifyToken(action.payload)
        const {user} = decoded
        return {...state, token: action.payload, user: user, loginError:[], registerError:[]}

    }
    else if(action.type===LOGOUT){
        return {...state, token:'', user:''}
    }
    else if(action.type === LOGIN_ERROR){
        return{
            ...state,
            loginError: action.payload,
        }
    }
    else{
        return state

    }

}

