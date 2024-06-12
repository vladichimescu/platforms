import { WIKI_PARAMS } from "@platforms/utils"

import dispatcher from "../dispatcher"

import actionTypes from "./action-types"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

let abortCtrl = new AbortController()

async function doFetchRequest(srsearch) {
  abortCtrl.abort()
  abortCtrl = new AbortController()

  dispatcher.dispatch({
    actionType: actionTypes.FETCH_REQUEST,
  })

  const params = new URLSearchParams({
    ...WIKI_PARAMS,
    srsearch,
  })

  try {
    const response = await fetch(`${WIKI_URL}?${params}`, {
      signal: abortCtrl.signal,
    })

    const { query: { search: data = [] } = {} } = await response.json()

    dispatcher.dispatch({
      actionType: actionTypes.FETCH_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatcher.dispatch({
      actionType: actionTypes.FETCH_FAILURE,
    })
  }
}

export { doFetchRequest }
