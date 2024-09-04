import { fetchKey } from '@/api/session'

const getDefaultState = () => {
  return {
    key: '',
    expire: 0,
    intervalId: 0
  }
}

const state = getDefaultState()

const mutations = {
  SET_KEY: (state, key) => {
    state.key = key
  },
  SET_EXPIRE: (state, expire) => {
    state.expire = expire
  },
  SET_INTERVAL_ID: (state, id) => {
    state.intervalId = id
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  }
}

function countExpire(seconds) {
  return seconds * 1000 * 0.8
}

const actions = {
  // 获取一个key，同时启动一个定时器定时更新key
  start({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      fetchKey().then(response => {
        const { data } = response
        commit('SET_KEY', data.key)
        commit('SET_EXPIRE', data.expire)

        const id = setInterval(() => {
          dispatch('update')
        }, countExpire(data.expire))
        commit('SET_INTERVAL_ID', id)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 更新key的值
  update({ commit }) {
    return new Promise((resolve, reject) => {
      fetchKey().then(response => {
        const { data } = response
        commit('SET_KEY', data.key)
        commit('SET_EXPIRE', data.expire)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 刷新key，同时重置定时器
  refresh({ dispatch }) {
    return new Promise(resolve => {
      dispatch('end')
      dispatch('start')
      resolve()
    })
  },

  // 停止定时器
  end({ commit, state }) {
    return new Promise((resolve) => {
      console.log('clear Interval id')
      clearInterval(state.intervalId)
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
