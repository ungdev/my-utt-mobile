import { api, getToken } from '../services/api'


export const fetchOrgas = async () => {
  const token = await getToken()
  const res = await api.get('public/listorgas?noElu=true', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data.filter(
    orga => !orga.name.includes('Elus') && !orga.name.includes('Élus')
  )
}

export const fetchOrga = async login => {
  const token = await getToken()
  const res = await api.get(`public/orgas/${login}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}
