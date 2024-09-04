<template>
  <section class="app-main">
    <keep-alive :include="cachedView">
      <router-view />
    </keep-alive>
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition> -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      cachedView: []
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  created: function() {
    this.initCachedView()
  },
  methods: {
    initCachedView() {
      const routes = this.$store.state.permission.routes
      const views = this.filterViews(routes)
      views.forEach(element => {
        this.cachedView.push(element.name)
      })
    },
    filterViews(routes) {
      let views = []
      routes.forEach(route => {
        if (route.meta && route.meta.cached) {
          views.push(route)
        }
        if (route.children) {
          const tempViews = this.filterViews(route.children)
          if (tempViews.length) {
            views = views.concat(tempViews)
          }
        }
      })
      return views
    }
  }
}
</script>

<style scoped>
.app-main {
  /* 原来是减少50，现在是减少100 */
  /* 50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  min-height: calc(100vh - 100px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 15px;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
