import React, { Fragment } from "react"
import { connect } from "react-redux"

import {
  DebounceInput,
  fetchReduxRequest,
  selectFetchReduxData,
  selectFetchReduxLoading,
} from "@platforms/react-components"

function Fetch({ loading, data, reduxFetchRequest }) {
  return (
    <Fragment>
      <DebounceInput
        type="text"
        onChange={(e) => {
          reduxFetchRequest(e.target.value)
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

const mapStateToProps = (state, props) => ({
  loading: selectFetchReduxLoading(state),
  data: selectFetchReduxData(state),
})

const mapDispatchToProps = {
  reduxFetchRequest: fetchReduxRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(Fetch)
