
/**
 * 根据某一天日期 获取 当前周的第一天和最后一天的日期（周一和周日）
 * @param date {Date}
 * @return {{endDate: Date, startDate: Date}}
 */
 export function getStartAndEndDateOfWeek(date) {
  const millisecondsOfDay = 24 * 60 * 60 * 1000
  let dayOfWeek = date.getDay()
  if (dayOfWeek === 0) dayOfWeek = 7
  const startDate = new Date(date.getTime() - (dayOfWeek - 1) * millisecondsOfDay)
  const endDate = new Date(date.getTime() + (7 - dayOfWeek) * millisecondsOfDay)
  return { startDate, endDate }
}

/**
 * 根据某一天日期 获取 当前月的第一天和最后一天的日期
 * @param date {Date}
 * @return {{endDate: Date, startDate: Date}}
 */
export function getStartAndEndDateOfMonth(date) {
  let year = date.getFullYear() // 2021
  const month = date.getMonth() + 1 // 0 1 2 3 4 5 6 7 8 9 10 11
  const startDate = new Date(year + '/' + month + '/' + 1)
  let nextMonth = month + 1
  if (nextMonth === 13) {
    year += 1
    nextMonth = 1
  }
  const dateLong = (new Date(year + '/' + nextMonth + '/' + 1)).getTime() - 24 * 60 * 60 * 1000
  const endDate = new Date(dateLong)

  return { startDate, endDate }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function dateAlignment(startDate, endDate) {
  startDate.setHours(0)
  startDate.setMinutes(0)
  startDate.setSeconds(0)
  endDate.setHours(23)
  endDate.setMinutes(59)
  endDate.setSeconds(59)
}
