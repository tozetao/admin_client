import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: 'setting/recharge_url',
    method: 'get',
    params
  })
}

export function update(data) {
  return request({
    url: '/setting/recharge_url',
    method: 'post',
    data
  })
}