import request from '@/utils/request'

export function getInStorageList(data) {
  return request({
    url: 'api/getInStorageList',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function addAndUpdateInStorage(data) {
  return request({
    url: 'api/addAndUpdateInStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function deleteInStorage(data) {
  return request({
    url: 'api/deleteInStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}