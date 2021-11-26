import axios from 'axios'
import {SET_LODER, CLOSE_LODER, SET_TOKEN, REGISTER_ERROR, LOGIN_ERROR} from '../constants/UserConstant'

export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LODER })
        try {
            const {data} = await axios.post('/register', state, config)
            dispatch({ type: CLOSE_LODER })
            console.log(data)

            //save the localstaorage in token
            localStorage.setItem('myToken', data.token)
            dispatch({type: SET_TOKEN, payload: data.token})

            
        } catch (error) {
            dispatch({ type: 'CLOSE_LODER' })
            dispatch({ type: REGISTER_ERROR , payload: error.response.data.errors })
            console.log(error.response)
        }
    }
}





export const postLogin = (state)=>{
    return async (dispatch)=>{
        const config = {
            Headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            dispatch({type:SET_LODER})
            const {data} = await axios.post('/login', state, config)
            dispatch({type:CLOSE_LODER})
            localStorage.setItem("myToken",data.token)
            dispatch({type: SET_TOKEN, payload: data.token})
            
        } catch (error) {
            dispatch({type:CLOSE_LODER})
            dispatch({type:LOGIN_ERROR, payload:error.response.data.errors})
            console.log(error.response)
        }
    }

}