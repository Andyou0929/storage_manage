import request from '@/utils/request'

export function getGoodsList() {
  return request({
    url: 'api/getCount',
    method: 'get',
  })
}