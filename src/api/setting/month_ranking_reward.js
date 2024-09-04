import request from '@/utils/request'

export const PointRanking = 1

export function rankingTypeOptions() {
  return [
    { label: '5G票排行榜', value: 1 },
    { label: '娃娃排行榜', value: 2 },
    { label: '乐享票排行榜', value: 3 }
  ]
}

export function translateType(type) {
  switch (Number(type)) {
    case 1:
      return '5G票排行榜'
    case 2:
      return '娃娃排行榜'
    case 3:
      return '乐享票排行榜'
    default:
      return '-'
  }
}

export function fetchData(params) {
  return request({
    url: '/setting/month_ranking_reward',
    method: 'get',
    params
  })
}

export function update(data) {
  console.log('data: %o', data)
  return request({
    url: '/setting/month_ranking_reward/update',
    method: 'post',
    data
  })
}

export function create(data) {
  return request({
    url: '/setting/month_ranking_reward/create',
    method: 'post',
    data
  })
}

export function deleteWeekRanking(id) {
  return request({
    url: '/setting/month_ranking_reward/delete',
    method: 'post',
    data: { id }
  })
}

export function changeType(type) {
  return request({
    url: '/setting/month_ranking_reward/change_type',
    method: 'post',
    data: {
      type
    }
  })
}
