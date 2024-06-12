import StorageService from "./storage"

const storageKeys = StorageService.getKeys()
const authKey = storageKeys.APP_AUTH_JWT

const getToken = () => StorageService.getItem({ id: authKey })

const getAuthHeader = () => ({
  authorization: `Bearer ${getToken()}`,
})

const saveToken = (token) =>
  StorageService.setItem({ id: authKey, data: token })

const removeToken = () => StorageService.removeItem({ id: authKey })

const AuthService = {
  getToken,
  getAuthHeader,
  saveToken,
  removeToken,
}

export default AuthService
