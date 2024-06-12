import React, { useEffect, useState } from "react"

import { UserApi } from "@platforms/apis"
import { useAuth } from "@platforms/react-components"

function Dashboard() {
  const { resign } = useAuth()
  const [user, setUser] = useState()

  useEffect(() => {
    setupUser()

    async function setupUser() {
      try {
        const user = await UserApi.info()

        setUser(user)
      } catch (err) {
        await resign()

        setupUser()
      }
    }
  }, [resign])

  return (
    <div style={{ marginTop: "20px" }}>
      <code style={{ display: "block" }}>profile</code>
      {user &&
        Object.keys(user).map((prop) => (
          <div key={prop}>
            {prop}: {user[prop].toString()}
          </div>
        ))}
    </div>
  )
}

export default Dashboard
