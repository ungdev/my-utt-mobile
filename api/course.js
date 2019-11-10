import { api, getToken } from '../services/api'

export const fetchCourses = async login => {
  const token = await getToken()
  const res = await api.get(`public/users/${login}/courses`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.courses
}
