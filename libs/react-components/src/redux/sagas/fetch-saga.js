import { CANCEL } from "redux-saga"
import { call, put, takeLatest } from "redux-saga/effects"

import { WIKI_PARAMS } from "@platforms/utils"

import {
  FETCH_REQUEST,
  fetchFailure,
  fetchSuccess,
} from "../actions/fetch-actions"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

const cancellableFetch = (url, config = {}) => {
  const abortCtrl = new AbortController()

  const request = fetch(url, { ...config, signal: abortCtrl.signal })
  request[CANCEL] = () => abortCtrl.abort()

  return request
}

function* doFetchRequest({ payload }) {
  const params = new URLSearchParams({
    ...WIKI_PARAMS,
    srsearch: payload,
  })

  try {
    const response = yield call(cancellableFetch, `${WIKI_URL}?${params}`)

    const { query: { search: data = [] } = {} } = yield response.json()

    yield put(fetchSuccess(data))
  } catch (e) {
    yield put(fetchFailure())
  }
}

function* watchFetch() {
  yield takeLatest(FETCH_REQUEST, doFetchRequest)
}

export default watchFetch
