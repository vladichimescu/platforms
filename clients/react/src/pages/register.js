import React, { Fragment, useState } from "react"
import { Link } from "react-router-dom"

import { useAuth } from "@platforms/react-components"

function Register() {
  const { register } = useAuth()

  const [first, setFirst] = useState("")
  const [last, setLast] = useState("")
  const [phone, setPhone] = useState("")
  const [phoneDisplay, setPhoneDisplay] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [errors, setErrors] = useState()

  function onSubmit(ev) {
    ev.preventDefault()

    register({ first, last, phone, email, password }).catch(setErrors)
  }

  function validateFirstLetterUppercase(field, text, successCallback) {
    const textFirstLetter = text[0]
    if (
      textFirstLetter !== undefined &&
      (!isNaN(text) || textFirstLetter !== textFirstLetter.toUpperCase())
    ) {
      setErrors({
        ...errors,
        [field]: {
          code: `${field}_invalid`,
          message: "first letter must be uppercase",
        },
      })
      return
    }

    const { [field]: fieldIgnored, ...err } = errors
    setErrors(err)

    successCallback(text)
  }

  function validatePhone(text) {
    const cleaned = text.replace(/\D/g, "").slice(-10)
    const match = cleaned.match(/^(\d{4})(\d{3})(\d{3})$/)

    if (match) {
      setPhoneDisplay(`${match[1]}-${match[2]}-${match[3]}`)
    } else {
      setPhoneDisplay(cleaned)
    }

    setPhone(cleaned)
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label htmlFor="first">first name</label>
        <input
          name="first"
          type="text"
          value={first}
          onChange={(e) =>
            validateFirstLetterUppercase(
              e.target.name,
              e.target.value,
              setFirst
            )
          }
        />
        {errors?.first && <span>{errors.first.message}</span>}
        <br />

        <label htmlFor="last">last name</label>
        <input
          name="last"
          type="text"
          value={last}
          onChange={(e) =>
            validateFirstLetterUppercase(e.target.name, e.target.value, setLast)
          }
        />
        {errors?.last && <span>{errors.last.message}</span>}
        <br />

        <label htmlFor="phone">phone</label>
        <input
          name="phone"
          type="text"
          value={phoneDisplay}
          onChange={(e) => validatePhone(e.target.value)}
        />
        {errors?.phone && <span>{errors.phone.message}</span>}
        <br />

        <label htmlFor="email">email</label>
        <input
          required
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors?.email && <span>{errors.email.message}</span>}
        <br />

        <label htmlFor="password">password</label>
        <input
          required
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors?.password && <span>{errors.password.message}</span>}
        <br />

        <button type="submit">register</button>
      </form>

      <Link to="/login">login</Link>
    </Fragment>
  )
}

export default Register
