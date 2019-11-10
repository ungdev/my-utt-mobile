import { api, getToken } from '../services/api'

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

export const fetchUEReviews = async slug => {
  const token = await getToken()
  const res = await api.get(`ues/${slug}/reviews`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.reviews
}
