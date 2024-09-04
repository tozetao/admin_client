import { constantRoutes, asyncRoutes } from '@/router'

// 根据权限过滤路由
function filterAsyncRoutes(routes, permissions) {
  const res = []
  let children = []
  routes.forEach(route => {
    const node = { ...route }
    // 遍历所有子节点，对于父节点来说，如果children不为空，则该父节点就是有权限的。
    if (node.children) {
      children = filterAsyncRoutes(node.children, permissions)
      if (children.length !== 0) {
        node.children = children
        res.push(node)
      }
    } else {
      // node.meta.permission的类型
      // string: 直接判断是否有权限
      // object: { ignore: boolean || value: string }
      // function(permissions): permissions是用户权限列表
      const permission = node.meta.permission
      if (typeof permission === 'string' && permissions.includes(permission)) {
        res.push(node)
      } else if (typeof permission === 'object') {
        if (permission.ignore || permissions.includes(permission.value)) {
          res.push(node)
        }
      } else if (typeof permission === 'function') {
        if (permission(permissions)) {
          res.push(node)
        }
      }
    }
  })
  return res
}

const getDefaultState = () => {
  return {
    routes: [], // 所有路由
    addRoutes: [] // 用户所添加的路由
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

const actions = {
  generateRoutes({ commit }, permissions) {
    return new Promise(resolve => {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, permissions)
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  },
  // 重置权限
  reset({ commit }) {
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
