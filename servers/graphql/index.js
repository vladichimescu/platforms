import cors from "cors"
import express from "express"
import { createHandler } from "graphql-http/lib/use/express"
import jwt from "jsonwebtoken"

import schema from "./schema.js"

const SECRET = process.env.SECRET
const PORT = process.env.GRAPHQL_PORT

const server = express()
server.use(cors())
server.use(auth)
server.use(
  "/graphql",
  createHandler({
    schema,
  })
)

server.listen(PORT, () => console.log(`GraphQL Server started on port ${PORT}`))

//#region
function auth(req, res, next) {
  const bearer = req.headers?.authorization || ""
  const token = bearer.split(" ")[1]

  if (!token) {
    return res.status(401).send({
      code: "unauthorized",
      message: "unauthorized",
    })
  }

  jwt.verify(token, SECRET, function (err) {
    if (err) {
      return res.status(401).send({
        code: "authentication_failed",
        message: "authentication failed",
      })
    }

    next()
  })
}
//#endregion
