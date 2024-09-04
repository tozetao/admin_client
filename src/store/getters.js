import { Admin, Distributor, Promoter } from '@/api/session'

const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  config: state => state.app.config,
  token: state => state.user.token,
  user: state => state.user.body,
  key: state => state.timerKey.key,
  routes: state => state.permission.routes,
  isCentralAdmin: (state) => {
    return state.user.body ? state.user.body.isCentralAdmin : false
  },
  isAdmin: (state) => {
    const type = state.user.body ? state.user.body.type : undefined
    return Admin === Number(type)
  },
  belongsToCentralServer: (state) => {
    return state.user.body.belongsToCentralServer
  },
  defaultScId: (state) => {
    return state.user.body.defaultScId
  },
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  hasPermission(state) {
    return (value) => {
      return state.user?.body?.permissions.indexOf(value) !== -1
    }
  }
}
export default getters
