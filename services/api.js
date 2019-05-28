import axios from 'axios'
import { AsyncStorage } from 'react-native'
import config from '../config'
import { ACCESS_TOKEN_KEY } from '../constants/StorageKey'

const api = axios.create({
  baseURL: config.etu_utt_baseuri
})

const getToken = async () => {
  // TODO Check token expiration, and if it expired, redirect to Login
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) throw 'NO_TOKEN'
  return token
}

export const fetchUser = async () => {
  const token = await getToken()
  const res = await api.get('private/user/account', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

export const fetchUEs = async () => {
  const token = await getToken()
  const res = await api.get('ues', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.ues
}

export const fetchUEDetails = async slug => {
  const token = await getToken()
  const res = await api.get(`ues/${slug}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchUECommentaires = async slug => {
  const token = await getToken()
  const res = await api.get(`ues/${slug}/comments`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.comments
}

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
