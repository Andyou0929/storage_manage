import request from '@/utils/request'

export function getUserList(data) {
    return request({
        url: 'api/getUserList',
        method: 'post',
        data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
    })
}

export function addUser(data){
  return request({
    url: 'api/addUser',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}

export function updatePower(data){
  return request({
    url: 'api/updatePower',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}
export function deleteUser(data){
  return request({
    url: 'api/deleteUser',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}

export function updateUser(data){
  return request({
    url: 'api/updateUser',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}