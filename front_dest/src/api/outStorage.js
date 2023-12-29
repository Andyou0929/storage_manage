import request from '@/utils/request'

export function getOutStorageList(data) {
  return request({
    url: 'api/getOutStorageList',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function addAndUpdateOutStorage(data) {
  return request({
    url: 'api/addAndUpdateOutStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function deleteOutStorage(data) {
  return request({
    url: 'api/deleteOutStorage',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}