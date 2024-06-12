import axios from "axios"

import { WIKI_PARAMS } from "@platforms/utils"

import dispatcher from "../dispatcher"

import actionTypes from "./action-types"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

let abortCtrl = new AbortController()

async function doAxiosRequest(srsearch) {
  abortCtrl.abort()
  abortCtrl = new AbortController()

  dispatcher.dispatch({
    actionType: actionTypes.AXIOS_REQUEST,
  })

  const params = {
    ...WIKI_PARAMS,
    srsearch,
  }

  try {
    const { query: { search: data = [] } = {} } = await axios(WIKI_URL, {
      params,
      signal: abortCtrl.signal,
    })

    dispatcher.dispatch({
      actionType: actionTypes.AXIOS_SUCCESS,
      payload: data,
    })
  } catch (e) {
    dispatcher.dispatch({
      actionType: actionTypes.AXIOS_FAILURE,
    })
  }
}

export { doAxiosRequest }
