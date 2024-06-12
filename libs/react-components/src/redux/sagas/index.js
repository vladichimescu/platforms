import { all } from "redux-saga/effects"

import watchAxios from "./axios-saga"
import watchFetch from "./fetch-saga"

function* sagas() {
  yield all([watchFetch(), watchAxios()])
}

export default sagas
