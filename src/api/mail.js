import request from '@/utils/request'
import exportExcel from '@/utils/export-excel'

export const EveryOne = 2
export const Single = 1

export function exportData(data) {
  const params = {...data, is_export: 1 }
  return exportExcel({
    url: '/mail/index',
    method: 'get',
    params
  })
}

export function translateStatus(status) {
  switch(Number(status)) {
    case 0:
      return '未领取'
    case 1:
      return '已领取'
    case 2:
      return '已删除'
    default:
      return '-'
  }
}

export function translateType(value) {
  value = Number(value)
  switch (value) {
    case Single:
      return this.$t('email.single')
    case EveryOne:
      return this.$t('email.everyone')
    case 7:
      return '周排行邮件'
    default:
      return '-'
  }
}

export function typeOptions() {
  const singleLabel = this.$t('email.single')
  const everyoneLabel = this.$t('email.everyone')
  return [
    {
      label: singleLabel,
      value: Single
    },
    {
      label: everyoneLabel,
      value: EveryOne
    }
  ]
}

export function fetchMails(data) {
  return request({
    url: 'mail/index',
    method: 'get',
    params: data
  })
}

export function createMail(data) {
  return request({
    url: 'mail/create',
    method: 'post',
    data
  })
}

export function removeMail(data) {
  return request({
    url: 'mail/remove',
    method: 'post',
    data
  })
}
