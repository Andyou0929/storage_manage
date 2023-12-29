import request from '@/utils/request'

export function getPADList(data) {
  return request({
    url: 'api/getPADList',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}

export function addAndUpdatePAC(data) {
  return request({
    url: 'api/addAndUpdatePAC',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}

export function deletePAC(data) {
  return request({
    url: 'api/deletePAC',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}