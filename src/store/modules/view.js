const state = {
  cachedViews: []
}

const mutations = {
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) {
      return
    }
    if (view.meta.cached) {
      state.cachedViews.push(view.name)
    }
  }
}