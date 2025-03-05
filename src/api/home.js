import request from '@/utils/request'
export const getHomeData = () => {
  return request.get('/pages/details', {
    params: {
      pageId: 1
    }
  })
}
