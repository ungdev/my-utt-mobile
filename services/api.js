import axios from 'axios'
import { AsyncStorage } from 'react-native'
import config from '../config'
import { ACCESS_TOKEN_KEY } from '../constants/StorageKey'

const api = axios.create({
  baseURL: config.etu_utt_baseuri
})

const getToken = async () => { // TODO Check token expiration, and if it expired, redirect to Login
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) throw 'NO_TOKEN'
  return token
}




export const fetchUEs = async () => {
  const token = await getToken()
  const res = await api.get('ues', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return Object.values(res.data)
}

export const fetchUEDetails = async slug => {
  const token = await getToken()
  const res = await api.get(`ues/${slug}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

