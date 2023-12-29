import request from '@/utils/request'

export function getStorageList(data) {
  return request({
    url: 'api/getStorageList',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function addAndUpdateStorage(data) {
  return request({
    url: 'api/addAndUpdateStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function deleteStorage(data) {
  return request({
    url: 'api/deleteStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}