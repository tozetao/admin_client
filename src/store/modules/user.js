import { login, logout, showSession, lock, unlock, updateSession } from '@/api/session'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // 用于幂等性验证
    key: '',
    token: getToken(),
    // 用户数据，即服务器传递过来的body对象
    body: {
      id: 0,
      pid: 0,
      account: 0,
      type: 0,
      parent: '',
      timezone: '',
      locale: '',
      permissions: [],
      createdAt: '',
      attribute: 0,
      status: 0,
      serverNo: 0,
      belongsToCentralServer: false,
      activeServerId: 0,
      activeServerName: '',
      isCentralAdmin: false
    },
    timezones: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_KEY: (state, key) => {
    state.key = key
  },
  SET_BODY: (state, { id, pid, account, server_no, type, parent, timezone, locale, permissions, created_at, attribute, status, belongs_to_central_server, active_server_id, is_central_admin, active_server_name }) => {
    state.body.id = id
    state.body.pid = pid
    state.body.account = account
    state.body.serverNo = server_no
    state.body.type = type
    state.body.parent = parent
    state.body.timezone = timezone
    state.body.locale = locale
    state.body.permissions = permissions
    state.body.createdAt = created_at
    state.body.attribute = attribute
    state.body.status = status
    state.body.belongsToCentralServer = belongs_to_central_server
    state.body.activeServerId = active_server_id
    state.body.activeServerName = active_server_name
    state.body.isCentralAdmin = is_central_admin
  },
  SET_TIMEZONES: (state, timezones) => {
    state.timezones = timezones
  },
  SET_BODY_FIELDS: (state, obj) => {
    for (var field in obj) {
      state.body[field] = obj[field]
    }
  },
  SET_ACTIVE_SERVER_ID: (state, id) => {
    state.body.activeServerId = id
  }
}

const actions = {
  setBodyFields({ commit }, data) {
    commit('SET_BODY_FIELDS', data)
  },
  setActiveServerId({ commit }, id) {
    return new Promise((resolve, reject) => {
      updateSession({
        active_server_id: id
      }).then(() => {
        commit('SET_ACTIVE_SERVER_ID', id)
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  // user login
  login({ commit }, userInfo) {
    const { username, password, code } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password, code })
        .then((response) => {
          const { data } = response

          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  // get user info
  show({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      showSession(state.token).then((response) => {
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        const { body, config } = data
        commit('SET_BODY', body)
        dispatch('app/setConfig', config, { root: true })
        dispatch('polling/start', null, { root: true })
        // dispatch('timerKey/start', null, { root: true })
        resolve(body)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  refresh({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      showSession(state.token).then((response) => {
        const { data } = response
        const { body, config } = data
        commit('SET_BODY', body)
        dispatch('app/setConfig', config, { root: true })
        resolve(body)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        removeToken() // must remove  token  first
        resetRouter()

        commit('RESET_STATE')
        dispatch('permission/reset', null, { root: true })
        // dispatch('timerKey/end', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  lock({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      lock().then(response => {
        const { data } = response
        if (!data) {
          return reject('lock failed.')
        }

        const { body, config } = data
        commit('SET_BODY', body)
        dispatch('app/setConfig', config, { root: true })
        resolve(body)
      }).catch(error => {
        reject(error)
      })
    })
  },

  unlock({ commit, dispatch }, password) {
    return new Promise((resolve, reject) => {
      unlock(password).then(response => {
        const { data } = response
        if (!data) {
          return reject('unlock failed.')
        }

        const { body, config } = data
        commit('SET_BODY', body)
        dispatch('app/setConfig', config, { root: true })
        resolve(body)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
