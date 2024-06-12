import React, { createContext, useContext, useState } from "react"

import { AuthApi, UserApi } from "@platforms/apis"
import { AuthService } from "@platforms/services"

const Context = createContext()

function StateProvider(props) {
  const [isLogged, setIsLogged] = useState(!!AuthService.getToken())

  const state = {
    isLogged,
    login: async (account) => {
      try {
        const token = await AuthApi.login(account)
        AuthService.saveToken(token)

        setIsLogged(true)

        return token
      } catch (err) {
        setIsLogged(false)

        throw err
      }
    },
    logout: () => {
      AuthService.removeToken()

      setIsLogged(false)
    },
    register: async (account) => {
      const user = await UserApi.register(account)
      state.login(account)

      return user
    },
    resign: async () => {
      try {
        const token = await AuthApi.resign()
        AuthService.saveToken(token)
        return token
      } catch (err) {
        AuthService.removeToken()

        setIsLogged(false)

        throw err
      }
    },
  }

  return <Context.Provider value={state} {...props} />
}

export const AuthProvider = StateProvider
export const useAuth = () => useContext(Context)
