import React, { Fragment, useEffect, useState } from "react"

import {
  DebounceInput,
  doAxiosRequest,
  fluxAxiosStore,
} from "@platforms/react-components"

function Axios() {
  const [{ data, loading }, setData] = useState(
    fluxAxiosStore.retrieveAxiosRequest()
  )

  useEffect(() => {
    const onChange = () => setData(fluxAxiosStore.retrieveAxiosRequest())

    fluxAxiosStore.addChangeListener(onChange)

    return () => {
      fluxAxiosStore.removeChangeListener(onChange)
    }
  }, [])

  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          doAxiosRequest(e.target.value)
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

export default Axios
