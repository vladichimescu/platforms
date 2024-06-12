import axios from "axios"

import { AuthService } from "@platforms/services"

const IDENTITY_URL = process.env.REACT_APP_IDENTITY_URL

const login = async (account) => {
  try {
    const { token } = await axios.post(`${IDENTITY_URL}/auth`, account)

    return token
  } catch (error) {
    throw error
  }
}

const resign = async () => {
  try {
    const { token } = await axios.get(`${IDENTITY_URL}/auth`, {
      headers: AuthService.getAuthHeader(),
    })

    return token
  } catch (error) {
    throw error
  }
}

const AuthApi = {
  login,
  resign,
}

export default AuthApi
