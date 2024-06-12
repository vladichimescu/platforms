import React, { Fragment } from "react"

import {
  DebounceInput,
  useWikiByContextAxios,
} from "@platforms/react-components"

function Axios() {
  const { loading, data, axiosRequest } = useWikiByContextAxios()

  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          axiosRequest(e.target.value)
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
