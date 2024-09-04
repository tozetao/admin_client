import { parseTime } from "./datetime"
import { isNumeric } from "./math"
// created: 只在没有参数的情况下处理组件的首次请求。
// activted：只处理有参数的情况下，与内部状态不一致时则重新请求。在组件内部维护URL参数的状态，只有当URL参数发生变化的时候，才重新去请求数据。

/**
 * 获取URL的参数值
 * @param {string} name 
 * @returns 
 */
 export function getQueryValue(name) {
  const url = window.location.href
  const query = url.substr(url.indexOf('?') + 1)
  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] === name) {
      return pair[1]
    }
  }
  return null
}

/**
 * 过滤请求时传递的参数对象
 * @param {Object} query
 */
 export function filterRequestQuery(query) {
  const { ...newQuery } = query
  // eslint-disable-next-line
  if (query.hasOwnProperty('start')) {
    newQuery.start = parseTime(query.start)
  }
  // eslint-disable-next-line
  if (query.hasOwnProperty('end')) {
    newQuery.end = parseTime(query.end)
  }
  return newQuery
}

// 比较query对象与inner对象的属性值，返回query中属性值不同于inner属性值的属性列表。
export function diff(query, inner) {
  const keys = Object.keys(query)
  const diff = []
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (inner[key] === undefined) {
      diff.push(key)
      continue
    }
    if (inner[key] !== query[key]) {
      diff.push(key)
    }
  }
  return diff
}

export function apply(keys, query, inner, callbacks = {}) {
  if (keys instanceof Array && keys.length) {
    keys.forEach(key => {
      if (typeof callbacks[key] === 'function') {
        inner[key] = callbacks[key](query[key])
      } else {
        if (isNumeric(query[key])) {
          inner[key] = Number(query[key])
        } else {
          inner[key] = query[key]
        }
      }
    })
    return true
  }
  return false
}

export function hasQueryParams(query) {
  const keys = Object.keys(query)
  return keys.length > 0
}
