const FETCH_REQUEST = "FETCH_REQUEST"
const FETCH_SUCCESS = "FETCH_SUCCESS"
const FETCH_FAILURE = "FETCH_FAILURE"

const fetchRequest = (data) => {
  return { type: FETCH_REQUEST, payload: data }
}

const fetchSuccess = (data) => {
  return { type: FETCH_SUCCESS, payload: data }
}

const fetchFailure = () => {
  return { type: FETCH_FAILURE }
}

export {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  fetchRequest,
  fetchSuccess,
  fetchFailure,
}
