import request from '@/utils/request'
// export const getProList = (params) => {
//   return request.get('/goods/list', {
//     params
//   })
// }
export const getProList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
