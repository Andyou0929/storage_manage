import request from '@/utils/request'

export function getGoodsList(data) {
  return request({
    url: 'api/getGoodsList',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function addAndUpdateGoods(data) {
  return request({
    url: 'api/addAndUpdateGoods',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function deleteGoods(data) {
  return request({
    url: 'api/deleteGoods',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}