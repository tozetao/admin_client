import request from '@/utils/request'
import { translate } from '@/utils/i18n'

export function fetchAdmins(data) {
  return request({
    url: 'admin/index',
    method: 'get',
    params: data
  })
}

export function fetchAdmin(id) {
  return request({
    url: 'admin/show/' + id,
    method: 'get'
  })
}

export function createAdmin(data) {
  return request({
    url: 'admin/create',
    method: 'post',
    data
  })
}

export function updateAdmin(id, data) {
  return request({
    url: 'admin/update/' + id,
    method: 'post',
    data
  })
}

export function fetchPermissions() {
  return request({
    url: 'permission/index',
    method: 'get'
  })
}

export function changeStatus(data) {
  return request({
    url: 'admin/change_status',
    method: 'post',
    data: {
      statuses: data
    }
  })
}

export const Enabled = 0
export const Disabled = 1
export const Locked = 2

export function translateStatus(value) {
  value = Number(value)
  if (value === Enabled) {
    return translate('common.enabled')
  }
  if (value === Disabled) {
    return translate('common.disabled')
  }
  if (value === Locked) {
    return 'Locked'
  }
  return '-'
}

export function fetchActionLog(params) {
  return request({
    url: 'action_log',
    method: 'get',
    params
  })
}
