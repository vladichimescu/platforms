import React, { lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import { StyledNavBar, StyledNavLink } from "@platforms/react-components"

import NotFound from "../not-found"

const Axios = lazy(() => import("./axios"))
const Context = lazy(() => import("./context"))
const Fetch = lazy(() => import("./fetch"))
const Flux = lazy(() => import("./flux"))
const GraphQL = lazy(() => import("./graph-ql"))
const I18Next = lazy(() => import("./i18next"))
const Intl = lazy(() => import("./intl"))
const Redux = lazy(() => import("./redux"))
const Socket = lazy(() => import("./socket"))

function Features() {
  return (
    <div style={{ marginTop: "20px" }}>
      <code style={{ display: "block" }}>features</code>

      <div style={{ marginBottom: "20px" }}>
        <StyledNavBar>
          <StyledNavLink to="fetch">Fetch</StyledNavLink>
          <StyledNavLink to="axios">Axios</StyledNavLink>
          <StyledNavLink to="graphql">GraphQL</StyledNavLink>
          <StyledNavLink to="i18next">I18Next</StyledNavLink>
          <StyledNavLink to="intl">Intl</StyledNavLink>
          <StyledNavLink to="context">Context</StyledNavLink>
          <StyledNavLink to="flux">Flux</StyledNavLink>
          <StyledNavLink to="redux">Redux</StyledNavLink>
          <StyledNavLink to="socket">Socket</StyledNavLink>
        </StyledNavBar>
      </div>

      <Routes>
        <Route path="/" element={<Navigate replace to="fetch" />} />

        <Route path="fetch" element={<Fetch />} />
        <Route path="axios" element={<Axios />} />
        <Route path="graphql" element={<GraphQL />} />
        <Route path="i18next" element={<I18Next />} />
        <Route path="intl" element={<Intl />} />
        <Route path="context/*" element={<Context />} />
        <Route path="flux/*" element={<Flux />} />
        <Route path="redux/*" element={<Redux />} />
        <Route path="socket" element={<Socket />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default Features
