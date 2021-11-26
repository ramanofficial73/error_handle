import {createStore, applyMiddleware, combineReducers} from 'redux'
import {AuthReducer} from './reducers/AuthReducer'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
import {PostReducer, FetchPosts, FetchPost, UpdatePost, UpdateImage} from './reducers/PostReducers'
import {updateName} from './reducers/profileReducer'
const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
    updateName,
    
    
})

const middlewares = [thunkMiddleware]
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)))

export default Store;