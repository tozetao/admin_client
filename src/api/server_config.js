import request from '@/utils/request'

export const SelfOperated = 100

export function platformTypeOptions() {
  return [
    { label: '请选择平台', value: 0 },
    { label: '测试服', value: 99 },
    { label: '酷酷宝', value: 10001 },
    { label: '翠花', value: 10003 },
    { label: '油菜花', value: 10005 },
    { label: '鑫丰系统', value: 10002 },
    { label: '八达系统', value: 10004 },
    { label: '世软系统', value: 10006 },
    { label: '翰轩系统', value: 10007 },
    { label: '汤姆熊', value: 10008 },
    { label: '自然源', value: 10009 },
    { label: '10010', value: 10010 },
    { label: '东田Club', value: 10011 },
    { label: '茉莉幻想', value: 10012 },
    { label: '乐享天游', value: 10013 },
    { label: '卡通尼', value: 10014 },
    { label: '神采飞扬', value: 10015 },
    { label: '大玩家', value: 10016 }
  ]
}

export function agentTypeOptions() {
  return [
    { label: '请选择代理商', value: 0 },
    { label: '晞娱科技', value: 1 },
    { label: '蓝迪科技', value: 2 },
    { label: '自营', value: SelfOperated }
  ]
}

// 第三方平台类型，10001 酷酷宝、10003 翠花、10005 油菜花、10002 鑫丰系统、10004 八达系统、10006 世软系统、10007 翰轩系统、10008 汤姆熊、10009 自然源'
export function translatePlatformType(value) {
  switch (Number(value)) {
    case 99:
      return '测试服'
    case 10001:
      return '酷酷宝'
    case 10003:
      return '翠花'
    case 10005:
      return '油菜花'
    case 10002:
      return '鑫丰系统'
    case 10004:
      return '八达系统'
    case 10006:
      return '世软系统'
    case 10007:
      return '翰轩系统'
    case 10008:
      return '汤姆熊'
    case 10009:
      return '自然源'
    case 10010:
      return '10010'
    case 10011:
      return '东田Club'
    case 10012:
      return '茉莉幻想'
    case 10013:
      return '乐享天游'
    case 10014:
      return '卡通尼'
    default:
      return '-'
  }
}

export function translateAgentType(value) {
  switch (Number(value)) {
    case 1:
      return '晞娱科技'
    case 2:
      return '蓝迪科技'
    default:
      return '-'
  }
}

export function fetchServerConfigs(params) {
  return request({
    url: '/server_config/index',
    method: 'get',
    params
  })
}

export function createServerConfig(data) {
  return request({
    url: '/server_config/create',
    method: 'post',
    data
  })
}

export function fetchServerConfig(id) {
  return request({
    url: '/server_config/show',
    method: 'get',
    params: { id }
  })
}

export function update(data) {
  return request({
    url: '/server_config/update',
    method: 'post',
    data
  })
}
