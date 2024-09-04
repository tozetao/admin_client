import request from '@/utils/request'
import exportExcel from '@/utils/export-excel'
export const Enabled = 1
export const Disabled = 0

export const Online = 1
export const Local = 0

export function exportPlayers(params) {
  params.export = 1
  return exportExcel({
    url: '/player/index',
    method: 'get',
    params
  })
}

export function fetchPlayers(params) {
  params.export = 0
  return request({
    url: '/player/index',
    method: 'get',
    params
  })
}

export function fetchPlayer(params) {
  return request({
    url: '/player/show',
    method: 'get',
    params
  })
}

export function give(data) {
  return request({
    url: '/player/give',
    method: 'post',
    data
  })
}

export function deduct(data) {
  return request({
    url: '/player/deduct',
    method: 'post',
    data
  })
}

export function lock(data) {
  return request({
    url: '/player/lock',
    method: 'post',
    data
  })
}

export function unlock(id) {
  return request({
    url: '/player/unlock',
    method: 'post',
    data: { id }
  })
}

export function kick(id) {
  return request({
    url: '/player/kick',
    method: 'post',
    data: { 
      machine_id: id
    }
  })
}
