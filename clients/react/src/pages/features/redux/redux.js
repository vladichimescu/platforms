import React, { lazy } from "react"
import { Provider as ReduxProvider } from "react-redux"
import { Navigate, Route, Routes } from "react-router-dom"

import {
  StyledNavBar,
  StyledNavLink,
  reduxStore,
} from "@platforms/react-components"

import NotFound from "../../not-found"

const Axios = lazy(() => import("./axios"))
const Fetch = lazy(() => import("./fetch"))

function Redux() {
  return (
    <ReduxProvider store={reduxStore}>
      <div style={{ marginTop: "20px" }}>
        <code style={{ display: "block" }}>redux</code>

        <div style={{ marginBottom: "20px" }}>
          <StyledNavBar>
            <StyledNavLink to="fetch">Fetch</StyledNavLink>
            <StyledNavLink to="axios">Axios</StyledNavLink>
          </StyledNavBar>
        </div>

        <Routes>
          <Route path="/" element={<Navigate replace to="fetch" />} />

          <Route path="fetch" element={<Fetch />} />
          <Route path="axios" element={<Axios />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ReduxProvider>
  )
}

export default Redux
