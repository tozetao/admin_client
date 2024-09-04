// import app from '@/store/modules/app'
import user from '@/store/modules/user'

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function isInt(val) {
  return /^\d+$/.test(val)
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 将一个浮点数解析成一个包含整数部分、小数部分的对象
function resolveFloat(f) {
  const parts = f.toString().split('.')
  if (parts.length === 1) {
    return {
      integer: parts[0],
      decimal: ''
    }
  }
  if (parts.length === 2) {
    return {
      integer: parts[0],
      decimal: parts[1]
    }
  }
  return null
}

// export function hasPermission(user, value) {
//   const permissions = user ? user.permissions : []
//   return permissions && permissions.length > 0 && permissions.indexOf(value) !== -1
// }

export function handleExportFile(response) {
  console.log(response)
  // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
  let filename = decodeURI(response.headers['content-disposition'].split(';')[1].split('=')[1])
  filename = filename.replace(/\"/g, '')
  console.log('filename: %o', filename)
  // 将`blob`对象转化成一个可访问的`url`
  let url = window.URL.createObjectURL(new Blob([response.data]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click();
  document.body.removeChild(link)
}
