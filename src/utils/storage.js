// 存储localstorage的信息
const INFO_KEY = 'hm-shopping-info'
// 获取个人信息
export const getInfo = () => {
  const defaultObj = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)

  return res ? JSON.parse(res) : defaultObj
}
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
