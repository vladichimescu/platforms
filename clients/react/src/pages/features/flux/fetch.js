import React, { Fragment, useEffect, useState } from "react"

import {
  DebounceInput,
  doFetchRequest,
  fluxFetchStore,
} from "@platforms/react-components"

function Fetch() {
  const [{ data, loading }, setData] = useState(
    fluxFetchStore.retrieveFetchRequest()
  )

  useEffect(() => {
    const onChange = () => setData(fluxFetchStore.retrieveFetchRequest())

    fluxFetchStore.addChangeListener(onChange)

    return () => {
      fluxFetchStore.removeChangeListener(onChange)
    }
  }, [])

  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          doFetchRequest(e.target.value)
        }}
      />

      {loading && <span>loading</span>}

      {data?.length === 0 && <div>no results available</div>}
      {data?.map((r, i) => (
        <div key={i}>{r.title}</div>
      ))}
    </Fragment>
  )
}

export default Fetch
