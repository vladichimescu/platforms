import {
  FETCH_FAILURE,
  FETCH_REQUEST,
  FETCH_SUCCESS,
} from "../actions/fetch-actions"

const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true }
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload }
    case FETCH_FAILURE:
      return { ...state, loading: false }
    default:
      return state
  }
}

export default fetchReducer
