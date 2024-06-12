import { useEffect, useRef, useState } from "react"

import { WIKI_PARAMS } from "@platforms/utils"

const WIKI_URL = process.env.REACT_APP_WIKI_URL

function useWikiByFetch(srsearch) {
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

    const params = new URLSearchParams({
      ...WIKI_PARAMS,
      srsearch,
    })
    const options = {
      signal: abortCtrl.current.signal,
    }

    setLoading(true)
    setError()

    requestData()

    async function requestData() {
      try {
        const response = await fetch(`${WIKI_URL}?${params}`, options)
        const { query: { search: data = [] } = {} } = await response.json()

        setLoading(false)
        setData(data)
      } catch (err) {
        if (err.name === "AbortError") {
          return
        }

        // TODO: handle web errors
        if (err.status === 401) {
          // Handle unauthorized access
        } else if (err.status === 400) {
          // Handle business validation
        } else if (err.status === 404) {
          // Handle not found errors
        } else {
          // Handle other errors
        }

        setLoading(false)
        setError(err)
      }
    }
  }, [srsearch])

  return { loading, data, error }
}

export default useWikiByFetch
