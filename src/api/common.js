import request from '@/utils/request'

export const NormalImage = 1
export const StartupBannerImage = 3
export const NewsIcon = 4
export const NewsBanner = 5
export const ClawDetailImage = 7
export const WechatCustomerService = 9
export const LoadingIcon = 8
export const HomeBanner = 11
export const MachineGroup = 12

export const ASC = 1
export const DESC = 2

export function directionOptions() {
  return [
    { label: '顺序', value: ASC },
    { label: '倒序', value: DESC }
  ]
}

export function fetchGiftOptions() {
  return request({
    url: '/gift_options',
    method: 'get'
  })
}

export function fetchClassifyOptions() {
  return request({
    url: 'classify_options',
    method: 'get'
  })
}

// 这个版本的可以传递server_id来查询指定服的机台类型
export function fetchClassifyOptionsV2(params) {
  return request({
    url: 'classify_options/v2',
    method: 'get',
    params
  })
}

export function fetchServerOptions(params) {
  return request({
    url: 'server_options',
    method: 'get',
    params
  })
}

export function fetchMachineOptions(params) {
  return request({
    url: 'machine_options',
    method: 'get',
    params
  })
}

export function fetchPlayerNumOptions() {
  const options = []
  for (let i = 1; i <= 8; i++) {
    options.push({
      label: i + 'P',
      value: i
    })
  }
  return options
}
