// 存储localstorage的信息
const INFO_KEY = 'hm-shopping-info'
const HISTORY_KEY = 'hm-shopping-history'
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
export const getHistoryList = () => { // 获取历史记录
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
}
export const setHistoryList = (arr) => { // 设置历史记录
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
