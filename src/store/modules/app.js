import Cookies from 'js-cookie'

function getUploadAction() {
  // return 'http://localhost/5g/api/upload/image'
  return location.protocol + '//' + location.host + '/api/upload/image'
}

function getAssetDir() {
  return ''
  // return 'http://localhost/5g/public'
  // return location.protocol + '//' + location.host
}

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',

  // server端的配置
  config: {
    version: '1.00',
    uploadAction: getUploadAction(),
    assetDir: getAssetDir()
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_CONFIG: (state, { version }) => {
    state.config.version = version
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setConfig({ commit }, config) {
    commit('SET_CONFIG', config)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
