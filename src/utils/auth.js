export const getToken = () => {
  return localStorage.getItem('token')
}

export const clearToken = () => {
  return localStorage.removeItem('token')
}
