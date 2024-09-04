import request from '@/utils/request'

export const Admin = 1
export const Distributor = 2
export const Promoter = 3
export const AgentAdmin = 6

export const LockStatus = 2

export const zh_CN = 'zh_CN'
export const zh_HK = 'zh_HK'
export const en = 'en'

export function translateLocale(value) {
  switch (value) {
    case zh_CN:
      return '简体中文'
    case zh_HK:
      return '繁体中文'
    case en:
      return 'English'
  }
  return ''
}

export function translateType(type) {
  type = Number(type)
  if (type === Admin) {
    return this.$t('common.admin')
  } else if (type === Distributor) {
    return this.$t('common.distributor')
  }
  return '-'
}

export function login(data) {
  return request({
    url: 'session/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'session/logout',
    method: 'post'
  })
}

export function showSession() {
  return request({
    url: 'session/show',
    method: 'get'
  })
}

export function updateSession(data) {
  return request({
    url: 'session/update',
    method: 'post',
    data
  })
}

export function refresh() {
  return request({
    url: '/refresh',
    method: 'get'
  })
}

export function changePassword(data) {
  return request({
    url: '/change_password',
    method: 'post',
    data
  })
}

export function fetchKey() {
  return request({
    url: '/key',
    method: 'post'
  })
}

export function lock() {
  return request({
    url: '/lock',
    method: 'post'
  })
}

export function unlock(password) {
  return request({
    url: '/unlock',
    method: 'post',
    data: {
      password
    }
  })
}

export function polling() {
  return request({
    url: '/polling',
    method: 'get'
  })
}

export function fetchPlatform(params) {
  return request({
    url: '/platform',
    method: 'get',
    params
  })
}
