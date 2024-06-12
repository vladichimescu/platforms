import axiosReducer from "./axios"
import fetchReducer from "./fetch"

const fetchState = {
  loading: false,
  data: [],
}

const axiosState = {
  loading: false,
  data: [],
}

const reducersConfig = {
  fetch: [fetchReducer, fetchState],
  axios: [axiosReducer, axiosState],
}

const reducers = [
  combineReducers(reducersConfig),
  combineStates(reducersConfig),
]

function combineReducers(config) {
  return function (state, action) {
    return Object.keys(config).reduce((acc, key) => {
      const store = config[key][1] || {}
      const reducer =
        config[key][0] ||
        function () {
          return store
        }

      return {
        ...acc,
        [key]: reducer(state[key], action),
      }
    }, {})
  }
}

function combineStates(config) {
  return Object.keys(config).reduce((acc, key) => {
    const store = config[key][1] || {}

    return {
      ...acc,
      [key]: store,
    }
  }, {})
}

export default reducers
