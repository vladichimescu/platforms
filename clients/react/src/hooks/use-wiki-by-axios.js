import axios from "axios"
import { useEffect, useRef, useState } from "react"

import { WIKI_PARAMS } from "@platforms/utils"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

function useWikiByAxios(srsearch) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState()

  const abortCtrl = useRef(new AbortController())

  useEffect(
    () => () => {
      abortCtrl.current.abort()
      setLoading(false)
    },
    []
  )

  useEffect(() => {
    if (srsearch === undefined) {
      return
    }

    abortCtrl.current.abort()

    abortCtrl.current = new AbortController()

    const params = {
      ...WIKI_PARAMS,
      srsearch,
    }
    const options = {
      signal: abortCtrl.current.signal,
    }

    setLoading(true)
    setError()

    requestData()

    async function requestData() {
      try {
        const { query: { search: data = [] } = {} } = await axios(WIKI_URL, {
          ...options,
          params,
        })

        setLoading(false)
        setData(data)
      } catch (err) {
        if (axios.isCancel(err)) {
          return
        }

        setLoading(false)
        setError(err)
      }
    }
  }, [srsearch])

  return { loading, data, error }
}

export default useWikiByAxios
