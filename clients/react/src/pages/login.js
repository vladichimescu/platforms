import React, { Fragment, useState } from "react"
import { Link, Navigate } from "react-router-dom"

import { useAuth } from "@platforms/react-components"

function Login() {
  const { isLogged, login } = useAuth()
  const [errors, setErrors] = useState()

  function onSubmit(ev) {
    ev.preventDefault()

    const form = ev.currentTarget
    const email = form.email.value
    const password = form.password.value

    login({ email, password }).catch(setErrors)
  }

  if (!isLogged) {
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <label htmlFor="email">email</label>
          <input name="email" type="email" required />
          {errors?.email && <span>{errors.email.message}</span>}
          <br />

          <label htmlFor="password">password</label>
          <input name="password" type="password" required />
          {errors?.password && <span>{errors.password.message}</span>}
          <br />

          <button type="submit">login</button>
          {errors && !errors.email && !errors.password ? errors.message : null}
        </form>

        <Link to="/register">register</Link>
      </Fragment>
    )
  }

  return <Navigate to="/" />
}

export default Login
