import React, { Fragment, useState } from "react"

import { DebounceInput } from "@platforms/react-components"

import useWikiByFetch from "../../hooks/use-wiki-by-fetch"

function Fetch() {
  const [searchTerm, setSearchTerm] = useState()
  const { loading, data, error } = useWikiByFetch(searchTerm)

  return (
    <Fragment>
      <DebounceInput
        type="text"
        defaultValue={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value)
        }}
      />

      {loading && <span>loading</span>}
      {error && <span>{error?.message}</span>}

      {data?.length === 0 && <div>no results available</div>}
      {data?.map((r, i) => (
        <div key={i}>{r.title}</div>
      ))}
    </Fragment>
  )
}

export default Fetch
