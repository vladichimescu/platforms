import fs from "fs"
import jsonServer from "json-server"
import jwt from "jsonwebtoken"
import swaggerUi from "swagger-ui-express"

import apis from "./apis.js"
import { MOCK_FILE } from "./config.js"

const SECRET = process.env.SECRET
const PORT = process.env.IDENTITY_PORT

// import openapiDoc from "./openapi.json" assert { type: "json" }

const openapiDoc = JSON.parse(fs.readFileSync("./openapi.json"))

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(MOCK_FILE)

server.use(middlewares)
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiDoc))
server.use(apis)
server.use(auth)
server.use(router)

server.listen(PORT, () =>
  console.log(`Identity Server started on port ${PORT}`)
)

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
