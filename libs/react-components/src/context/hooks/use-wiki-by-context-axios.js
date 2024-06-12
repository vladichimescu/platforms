import { useContext } from ".."
import axios from "axios"
import { useEffect, useRef } from "react"

import { WIKI_PARAMS } from "@platforms/utils"

import {
  axiosFailure,
  axiosRequest,
  axiosSuccess,
} from "../actions/axios-actions"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

function useWikiByContextAxios() {
  const {
    state: { axios: state },
    dispatch,
  } = useContext()

  const abortCtrl = useRef(new AbortController())

  useEffect(
    () => () => {
      abortCtrl.current.abort()
      dispatch(axiosFailure())
    },
    [dispatch]
  )

  function doAxiosRequest(payload) {
    abortCtrl.current.abort()

    abortCtrl.current = new AbortController()

    const params = {
      ...WIKI_PARAMS,
      srsearch: payload,
    }
    const options = {
      signal: abortCtrl.current.signal,
    }

    dispatch(axiosRequest())

    requestData()

    async function requestData() {
      try {
        const { query: { search: data = [] } = {} } = await axios(WIKI_URL, {
          ...options,
          params,
        })

        dispatch(axiosSuccess(data))
      } catch (err) {
        if (axios.isCancel(err)) {
          return
        }

        dispatch(axiosFailure())
      }
    }
  }

  // const dispatchAction = (action) => (payload) => dispatch(action(payload));

  return {
    ...state,
    // axiosRequest: dispatchAction(axiosRequest),
    axiosRequest: doAxiosRequest,
  }
}

export default useWikiByContextAxios
