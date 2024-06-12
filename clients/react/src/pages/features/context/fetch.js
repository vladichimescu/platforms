import React, { Fragment } from "react"

import {
  DebounceInput,
  useWikiByContextFetch,
} from "@platforms/react-components"

function Fetch() {
  const { loading, data, fetchRequest } = useWikiByContextFetch()

  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          fetchRequest(e.target.value)
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
