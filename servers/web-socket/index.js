import jwt from "jsonwebtoken"
import WebSocket, { WebSocketServer } from "ws"

import { WEB_SOCKET_EVENTS } from "./config.js"

const SECRET = process.env.SECRET
const PORT = process.env.WEB_SOCKET_PORT

const server = new WebSocketServer({ port: PORT })

server.on("listening", () =>
  console.log(`WebSocket Server started on port ${PORT}`)
)

server.on("connection", function (ws) {
  ws.on("message", onMessage)
    .on(WEB_SOCKET_EVENTS.AUTHENTICATE, (token) => onAuthenticate(ws, token))
    .on(WEB_SOCKET_EVENTS.CHAT, (data) => onChat(ws, data))
})

//#region
function messageToEvent(event, message) {
  return JSON.stringify({
    type: event,
    payload: message,
  })
}

function onMessage(message) {
  try {
    const event = JSON.parse(message)
    this.emit(event.type, event.payload)
  } catch (err) {
    console.log(`Not an event: ${message}`)
  }
}

function onAuthenticate(ws, token) {
  if (!token) {
    ws.send(messageToEvent(WEB_SOCKET_EVENTS.AUTHENTICATE))
    return
  }

  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      ws.authorization = undefined

      ws.send(messageToEvent(WEB_SOCKET_EVENTS.AUTHENTICATE, err.name))
      return
    }

    ws.authorization = token
  })
}

function onChat(ws, data) {
  if (!ws.authorization) {
    ws.send(messageToEvent(WEB_SOCKET_EVENTS.AUTHENTICATE))
    return
  }

  jwt.verify(ws.authorization, SECRET, function (err, decoded) {
    if (err) {
      ws.authorization = undefined

      ws.send(messageToEvent(WEB_SOCKET_EVENTS.AUTHENTICATE, err.name))
      return
    }

    server.clients.forEach(function (client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(
          messageToEvent(WEB_SOCKET_EVENTS.CHAT, {
            email: decoded.data,
            message: data,
          })
        )
      }
    })
  })
}

//#endregion
