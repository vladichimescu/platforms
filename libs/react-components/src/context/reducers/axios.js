import {
  AXIOS_FAILURE,
  AXIOS_REQUEST,
  AXIOS_SUCCESS,
} from "../actions/axios-actions"

const axiosReducer = (state, action) => {
  switch (action.type) {
    case AXIOS_REQUEST:
      return { ...state, loading: true }
    case AXIOS_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case AXIOS_FAILURE:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default axiosReducer
