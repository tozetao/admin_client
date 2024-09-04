import { polling } from '@/api/session'

const getDefaultState = () => {
  return {
    timerId: 0,
    machineFailures: 0
  }
}

const state = getDefaultState()
const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TIMER_ID: (state, timerId) => {
    state.timerId = timerId
  },
  SET_MACHINE_FAILURES: (state, number) => {
    state.machineFailures = number
  }
}

const actions = {
  start({ commit, dispatch }) {
    // dispatch('request')
    const id = setInterval(() => {
      dispatch('request')
    }, 10000)
    commit('SET_TIMER_ID', id)
    console.log('start polling, timer id: %o', id)
  },
  stop({ state }) {
    console.log('clear timerId: %o', state.timerId)
    clearInterval(state.timerId)
  },
  request({ commit }) {
    return new Promise((resolve, reject) => {
      polling().then(response => {
        const { data } = response
        commit('SET_MACHINE_FAILURES', data.machine_failures)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
