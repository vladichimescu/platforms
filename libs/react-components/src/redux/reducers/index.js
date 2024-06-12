import { combineReducers } from "redux"

import axiosReducer from "./axios-reducer"
import fetchReducer from "./fetch-reducer"

const reducers = combineReducers({ fetch: fetchReducer, axios: axiosReducer })

export default reducers
