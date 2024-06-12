import axios from "axios"
import { CANCEL } from "redux-saga"
import { call, put, takeLatest } from "redux-saga/effects"

import { WIKI_PARAMS } from "@platforms/utils"

import {
  AXIOS_REQUEST,
  axiosFailure,
  axiosSuccess,
} from "../actions/axios-actions"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

const cancellableAxios = (url, config = {}) => {
  const abortCtrl = new AbortController()

  const request = axios(url, { ...config, signal: abortCtrl.signal })
  request[CANCEL] = () => abortCtrl.abort()

  return request
}

function* doAxiosRequest({ payload }) {
  const params = {
    ...WIKI_PARAMS,
    srsearch: payload,
  }

  try {
    const { query: { search: data = [] } = {} } = yield call(
      cancellableAxios,
      WIKI_URL,
      {
        params,
      }
    )

    yield put(axiosSuccess(data))
  } catch (e) {
    yield put(axiosFailure())
  }
}

function* watchAxios() {
  yield takeLatest(AXIOS_REQUEST, doAxiosRequest)
}

export default watchAxios
