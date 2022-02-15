
import {SET_DATA, GET_DATA_BY_ID, SET_ERROR} from "../actionType"

const initialState = {
  data: [],
  dataById: null,
  error: null,
}

function dataReducer (state = initialState, action) {
  const {type, payload} = action
  if (type === SET_DATA) {
    return {...state, data: payload}
  } else if (type === GET_DATA_BY_ID) {
    console.log("get data by id reducer", payload );
    return {...state, dataById: payload}
  } else if (type === SET_ERROR) {
    return { ...state, error: payload }
  }
  return state
}

export default dataReducer