const AXIOS_REQUEST = "AXIOS_REQUEST"
const AXIOS_SUCCESS = "AXIOS_SUCCESS"
const AXIOS_FAILURE = "AXIOS_FAILURE"

const axiosRequest = (data) => {
  return { type: AXIOS_REQUEST, payload: data }
}

const axiosSuccess = (data) => {
  return { type: AXIOS_SUCCESS, payload: data }
}

const axiosFailure = () => {
  return { type: AXIOS_FAILURE }
}

export {
  AXIOS_REQUEST,
  AXIOS_SUCCESS,
  AXIOS_FAILURE,
  axiosRequest,
  axiosSuccess,
  axiosFailure,
}
