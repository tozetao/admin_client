import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // routes是permission.js模块保存的
      const hasRoutes = store.getters.routes
      if (hasRoutes && hasRoutes.length !== 0) {
        next()
      } else {
        try {
          const user = await store.dispatch('user/show')
          const accessRoutes = await store.dispatch('permission/generateRoutes', user.permissions)
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.log(error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          // Message.error({ message: error || 'Has Error' })
          // next(`/login?redirect=${to.path}`)
          next(buildReloginUrl(to.path))
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(buildReloginUrl(to.path))
      NProgress.done()
    }
  }
})

function buildReloginUrl(redirect) {
  const code = window.localStorage.getItem('login_code')
  let url = '/login'
  const queries = []
  if (redirect) {
    queries.push({
      name: 'redirect',
      value: redirect
    })
  }
  if (code) {
    queries.push({
      name: 'code',
      value: code
    })
  }
  let queryStr = ''
  queries.forEach(item => {
    queryStr += item.name + '=' + item.value + '&'
  })
  if (queries.length > 0) {
    url += '?' + queryStr.substring(0, queryStr.length - 1)
  }
  console.log('url: %o', url)
  return url
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
