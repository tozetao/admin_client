import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import store from '@/store'
import i18n from '@/i18n/i18n'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['X-Default-Sc-Id'] = store.getters.defaultScId

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== 0) {
      // ignore error codes
      // if (res.code === 2024 || res.code === 2025 || res.code === 2026) {
      //   return res
      // }
      // 10003: 锁定账号
      if (res.code === 10003) {
        return res
      }
      // 10001: Illegal token; 10005: Other clients logged in;
      if (res.code === 10001 || res.code === 10005) {
        // to re-login
        const msg = res.code === 10001 ? i18n.t('common.login_tip') : i18n.t('common.different_location_tip')
        const confirm = i18n.t('common.enter')
        const cancel = i18n.t('common.cancel')
        const tips = i18n.t('common.tips')
        MessageBox.confirm(msg, tips, {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }

    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
