
import { api, getToken } from '../services/api'

export const setExpoPushToken = async pushToken => {
  const token = await getToken()
  const res = await api.post(
    `private/user/push-token`,
    { token: pushToken },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  )
  return res
}
