import React, { Fragment, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"

import {
  StyledNavBar,
  StyledNavLink,
  useAuth,
} from "@platforms/react-components"

import NotFound from "./pages/not-found"

const Contact = lazy(() => import("./pages/contact"))
const Dashboard = lazy(() => import("./pages/dashboard"))
const Features = lazy(() => import("./pages/features"))
const Landing = lazy(() => import("./pages/landing"))
const Login = lazy(() => import("./pages/login"))
const Logout = lazy(() => import("./pages/logout"))
const Register = lazy(() => import("./pages/register"))

function App() {
  const { isLogged } = useAuth()

  return (
    <Fragment>
      <div style={{ display: "flex" }}>
        <StyledNavLink
          to={isLogged ? "/dashboard" : "/landing"}
          style={{ marginRight: "auto" }}
        >
          Home
        </StyledNavLink>

        <StyledNavBar>
          <StyledNavLink to={"/landing"}>Landing</StyledNavLink>

          {isLogged ? (
            <Fragment>
              <StyledNavLink to={"/dashboard"}>Dashboard</StyledNavLink>
              <StyledNavLink to={"/features"}>Features</StyledNavLink>
            </Fragment>
          ) : null}

          <StyledNavLink to={"/contact"}>Contact</StyledNavLink>
        </StyledNavBar>

        {isLogged ? (
          <StyledNavLink to={"/logout"} style={{ marginLeft: "auto" }}>
            Logout
          </StyledNavLink>
        ) : (
          <StyledNavLink to={"/login"} style={{ marginLeft: "auto" }}>
            Login
          </StyledNavLink>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Navigate replace to={isLogged ? "/dashboard" : "/landing"} />
          }
        />

        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />

        <Route path="/landing" element={<Landing />} />
        <Route path="/contact" element={<Contact />} />

        {isLogged ? (
          <Fragment>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/features/*" element={<Features />} />
          </Fragment>
        ) : (
          <Route path="/register" element={<Register />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  )
}

export default App
