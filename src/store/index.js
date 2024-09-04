import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'
import timerKey from './modules/timer-key'
import tagsView from './modules/tagsView'
import polling from './modules/polling'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    timerKey,
    tagsView,
    polling
  },
  getters
})

export default store
