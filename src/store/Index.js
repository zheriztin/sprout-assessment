import {applyMiddleware, createStore} from 'redux'
import dataReducer from "./reducer"
import ReduxThunk from 'redux-thunk'

const store = createStore(dataReducer, applyMiddleware(ReduxThunk))

export default store