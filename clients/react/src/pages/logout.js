import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"

import { Loading, useAuth } from "@platforms/react-components"

function Logout() {
  const { isLogged, logout } = useAuth()

  useEffect(() => {
    if (isLogged) {
      logout()
    }
  }, [isLogged, logout])

  if (isLogged) {
    return <Loading />
  }

  return <Navigate to="/" />
}

export default Logout
