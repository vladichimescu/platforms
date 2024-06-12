import express from "express"
import fs from "fs"
import jwt from "jsonwebtoken"

import { MOCK_FILE } from "./config.js"

const SECRET = process.env.SECRET

const router = express.Router()

router.use(express.json())
router.use(express.urlencoded({ extended: false }))

router.route("/user").post(register).get(info)
router.route("/auth").post(login).get(resign)

export default router

//#region
const dbFile = fs.readFileSync(MOCK_FILE)
const data = JSON.parse(dbFile)

function register({ body: user = {} }, res) {
  const errors = {}
  const userMandatoryProps = ["first", "last", "email", "password"]

  userMandatoryProps.forEach((iProp) => {
    if (user[iProp] === undefined || user[iProp] === "") {
      errors[iProp] = {
        code: `${iProp}_required`,
        message: `${iProp} required`,
      }
    }
  })

  if (user.email) {
    const isEmailUsed = data.users.find((iUser) => iUser.email === user.email)

    if (isEmailUsed) {
      errors.email = {
        code: "email_invalid",
        message: "email already used",
      }
    }
  }

  if (Object.keys(errors).length) {
    return res.status(400).send(errors)
  }

  data.users.push(user)
  fs.writeFileSync(MOCK_FILE, JSON.stringify(data, null, 2), "utf-8")

  return res.status(200).send({ user })
}

function info({ headers: { authorization: bearer = "" } = {} }, res) {
  const token = bearer.split(" ")[1]

  if (!token) {
    return res.status(400).send({
      token: {
        code: "token_required",
        message: "token required",
      },
    })
  }

  jwt.verify(token, SECRET, function (err) {
    if (err) {
      return res.status(401).send({
        code: "token_invalid",
        message: "token invalid",
      })
    }

    const { data: email } = jwt.decode(token)
    const validUser = data.users.find((authUser) => authUser.email === email)

    if (!validUser) {
      return res.status(200).send({
        code: "email_invalid",
        message: "email already used",
      })
    }

    const { password, ...user } = validUser

    return res.status(200).send({ user })
  })
}

function login({ body: user = {} }, res) {
  const validUser = data.users.find((authUser) => authUser.email === user.email)

  if (!validUser) {
    return res.status(400).send({
      email: {
        code: "email_invalid",
        message: "email invalid",
      },
    })
  }

  const isPasswordValid = validUser.password === user.password
  if (!isPasswordValid) {
    return res.status(400).send({
      password: {
        code: "password_invalid",
        message: "password invalid",
      },
    })
  }

  const token = jwt.sign(
    {
      data: user.email,
    },
    SECRET,
    {
      expiresIn: "1h",
    }
  )

  return res.status(200).send({ token })
}

function resign({ headers: { authorization: bearer = "" } = {} }, res) {
  const token = bearer.split(" ")[1]

  if (!token) {
    return res.status(400).send({
      token: {
        code: "token_required",
        message: "token required",
      },
    })
  }

  jwt.verify(token, SECRET, function (err) {
    if (err && err.name !== "TokenExpiredError") {
      return res.status(400).send({
        token: {
          code: "token_invalid",
          message: "token invalid",
        },
      })
    }

    const decodedToken = jwt.decode(token)
    const newToken = jwt.sign(
      {
        data: decodedToken.data,
      },
      SECRET,
      {
        expiresIn: "12h",
      }
    )

    return res.status(200).send({ token: newToken })
  })
}
//#endregion
