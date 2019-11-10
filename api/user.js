import { api, getToken } from '../services/api'

export const fetchUser = async () => {
  const token = await getToken()
  const res = await api.get('private/user/account', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

export const fetchUsers = async (query, page) => {
  const params = buildParams(query)
  const token = await getToken()
  const res = await api.get('public/users?page=' + page + params, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export const fetchPublicUser = async login => {
  const token = await getToken()
  const res = await api.get(`public/users/${login}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data.data
}

const buildParams = query => {
  if (!query) throw 'Null Query'
  const {
    branch,
    level,
    speciality,
    formation,
    name,
    email,
    studentId,
    phone
  } = query
  let params = ''
  if (branch) params += '&branch=' + branch
  if (level) params += '&level=' + level
  if (speciality) params += '&speciality=' + speciality
  if (formation) params += '&formation=' + formation
  if (name) params += '&name=' + name
  if (email) params += '&mail=' + email
  if (studentId) params += '&student_id=' + studentId
  if (phone) params += '&phone=' + phone

  if (params === '') throw 'No params'
  return params
}
