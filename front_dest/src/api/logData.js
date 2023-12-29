import request from '@/utils/request'

export function getLogDataList(data) {
  return request({
    url: 'api/getLogData',
    method: 'post',
    data,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  })
}