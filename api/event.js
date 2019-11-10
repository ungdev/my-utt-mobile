import { api, getToken } from '../services/api'

export const fetchEvents = async (after, before) => {
  const token = await getToken()
  const res = await api.get(`events?after=${after}&before=${before}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.events
}
export const fetchEvent = async id => {
  const token = await getToken()
  const res = await api.get(`events/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.event
}
