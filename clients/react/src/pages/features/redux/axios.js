import React, { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  DebounceInput,
  axiosReduxRequest,
  selectAxiosReduxData,
  selectAxiosReduxLoading,
} from "@platforms/react-components"

function Axios() {
  const loading = useSelector(selectAxiosReduxLoading)
  const data = useSelector(selectAxiosReduxData)
  const dispatch = useDispatch()

  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          dispatch(axiosReduxRequest(e.target.value))
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
