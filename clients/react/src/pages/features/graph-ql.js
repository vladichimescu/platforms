import { gql, useQuery } from "@apollo/client"
import React, { Fragment, useState } from "react"

import { DebounceInput, GraphQLProvider } from "@platforms/react-components"

const WIKI_QUERY = gql`
  query ($searchTerm: String) {
    wiki(srsearch: $searchTerm) {
      title
    }
  }
`

function GraphQLQuery() {
  const [searchTerm, setSearchTerm] = useState()

  const {
    loading,
    data: { wiki: currentData = [] } = {},
    previousData: { wiki: previousData = [] } = {},
    error: { message: errorMessage } = {},
  } = useQuery(WIKI_QUERY, {
    variables: { searchTerm },
    skip: searchTerm === undefined,
  })

  const data = loading ? previousData : currentData

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
      {errorMessage && <span>{errorMessage}</span>}

      {data?.length === 0 && <div>no results available</div>}
      {data?.map((r, i) => (
        <div key={i}>{r.title}</div>
      ))}
    </Fragment>
  )
}

function GraphQL() {
  return (
    <GraphQLProvider>
      <GraphQLQuery />
    </GraphQLProvider>
  )
}

export default GraphQL
