import { useContext } from ".."
import { useEffect, useRef } from "react"

import { WIKI_PARAMS } from "@platforms/utils"

import {
  fetchFailure,
  fetchRequest,
  fetchSuccess,
} from "../actions/fetch-actions"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

function useWikiByContextFetch() {
  const {
    state: { fetch: state },
    dispatch,
  } = useContext()

  const abortCtrl = useRef(new AbortController())

  useEffect(
    () => () => {
      abortCtrl.current.abort()
      dispatch(fetchFailure())
    },
    [dispatch]
  )

  function doFetchRequest(payload) {
    abortCtrl.current.abort()

    abortCtrl.current = new AbortController()

    const params = new URLSearchParams({
      ...WIKI_PARAMS,
      srsearch: payload,
    })
    const options = {
      signal: abortCtrl.current.signal,
    }

    dispatch(fetchRequest())

    requestData()

    async function requestData() {
      try {
        const response = await fetch(`${WIKI_URL}?${params}`, options)

        const { query: { search: data = [] } = {} } = await response.json()

        dispatch(fetchSuccess(data))
      } catch (err) {
        if (err.name === "AbortError") {
          return
        }

        // TODO: pass error?
        dispatch(fetchFailure())
      }
    }
  }

  // const dispatchAction = (action) => (payload) => dispatch(action(payload));

  return {
    ...state,
    // fetchRequest: dispatchAction(fetchRequest),
    fetchRequest: doFetchRequest,
  }
}

export default useWikiByContextFetch
