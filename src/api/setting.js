import request from '@/utils/request'

export function fetchSetting() {
  return request({
    url: '/setting/base',
    method: 'get'
  })
}

export function updateSetting(data) {
  return request({
    url: '/setting/base',
    method: 'post',
    data
  })
}
