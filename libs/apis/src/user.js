import axios from "axios"

import { AuthService } from "@platforms/services"

const IDENTITY_URL = process.env.REACT_APP_IDENTITY_URL

const register = async (account) => {
  try {
    const { user } = await axios.post(`${IDENTITY_URL}/user`, account)

    return user
  } catch (error) {
    throw error
  }
}

const info = async () => {
  try {
    const { user } = await axios.get(`${IDENTITY_URL}/user`, {
      headers: AuthService.getAuthHeader(),
    })

    return user
  } catch (error) {
    throw error
  }
}

const UserApi = {
  register,
  info,
}

export default UserApi
