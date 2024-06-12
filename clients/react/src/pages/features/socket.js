import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"

import { UserApi } from "@platforms/apis"
import { useAuth } from "@platforms/react-components"
import { AuthService } from "@platforms/services"
import { WEB_SOCKET_EVENTS } from "@platforms/utils"

const WEB_SOCKET_URL = process.env.REACT_APP_WEB_SOCKET_URL

const messageToEvent = (event, message) =>
  JSON.stringify({
    type: event,
    payload: message,
  })

const wsAuthenticate = (ws) =>
  ws.send(
    messageToEvent(WEB_SOCKET_EVENTS.AUTHENTICATE, AuthService.getToken())
  )

const wsChat = (ws, message) =>
  ws.send(messageToEvent(WEB_SOCKET_EVENTS.CHAT, message))

function Socket() {
  const connection = useRef()

  const { resign, logout } = useAuth()

  const [account, setAccount] = useState("")
  const [messages, setMessages] = useState([])

  const onSubmit = (ev) => {
    ev.preventDefault()

    const form = ev.currentTarget
    const message = form.message.value

    wsChat(connection.current, message)

    setMessages([
      {
        email: account,
        message,
      },
      ...messages,
    ])

    form.reset()
  }

  const onAuthenticate = useCallback(
    function (event) {
      if (event.payload === "TokenExpiredError") {
        resign()
          .then(() => wsAuthenticate(connection.current))
          .catch(() => {})
      } else {
        logout()
      }
    },
    [resign, logout]
  )

  const onChat = useCallback(
    function (event) {
      setMessages([event.payload, ...messages])
    },
    [messages]
  )

  const onMessage = useCallback(
    function ({ data }) {
      try {
        const event = JSON.parse(data)

        switch (event.type) {
          case WEB_SOCKET_EVENTS.AUTHENTICATE:
            onAuthenticate(event)
            break
          case WEB_SOCKET_EVENTS.CHAT:
            onChat(event)
            break
          default:
            console.log("unknown message")
        }
      } catch (err) {
        console.log(`Not an event: ${data}`)
      }
    },
    [onAuthenticate, onChat]
  )

  useEffect(() => {
    const setAccountEmail = async () => {
      const { email } = await UserApi.info()
      setAccount(email)
    }

    setAccountEmail()

    connection.current = new WebSocket(WEB_SOCKET_URL)
    connection.current.onopen = () => wsAuthenticate(connection.current)

    return () => {
      connection.current.close()
    }
  }, [])

  useEffect(() => {
    connection.current.addEventListener("message", onMessage)

    return () => {
      connection.current.removeEventListener("message", onMessage)
    }
  }, [onMessage])

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <input type="text" name="message" />
      </form>
      {messages.map((m, i) => (
        <div key={`${i}${m}`}>
          <b>{m.email === account ? "me" : m.email}</b>: {m.message}
        </div>
      ))}
    </Fragment>
  )
}

export default Socket
