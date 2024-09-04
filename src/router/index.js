import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import IgnoreRouteArray from './ignore'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb.
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/Dashboard'),
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        cached: true
      }
    }]
  },
  {
    path: '/account',
    name: 'my',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'info',
        name: 'Account',
        component: () => import('@/views/account/Account'),
        meta: {
          title: 'account'
        }
      }
    ]
  },
  // {
  //   path: '/demo',
  //   component: Layout,
  //   name: 'DemoGroup',
  //   meta: {
  //     title: 'Demo',
  //     icon: 'el-icon-s-tools'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Demo',
  //       component: () => import('@/views/analysis/MachineProfitPie'),
  //       meta: {
  //         title: 'Demo'
  //       }
  //     },
  //     {
  //       path: 'scroll_bar',
  //       name: 'ScrollBarDemo',
  //       component: () => import('@/views/demo/ScrollBarDemo'),
  //       meta: {
  //         title: 'Demo'
  //       }
  //     }
  //   ]
  // }
]

const customRoutes = [
  {
    path: '/system',
    component: Layout,
    name: 'systemManagement',
    meta: {
      title: 'system_management',
      icon: 'el-icon-s-platform'
    },
    alwaysShow: true,
    children: [
      {
        path: 'server_config',
        name: 'ServerConfig',
        component: () => import('@/views/server_config/ServerConfig'),
        meta: {
          title: 'server_config',
          permission: 'server_config',
          cached: true
        }
      },
      {
        path: 'server_config/create',
        name: 'ServerConfigCreate',
        component: () => import('@/views/server_config/ServerConfigCreate'),
        hidden: true,
        meta: {
          title: 'server_config_create',
          permission: 'server_config'
        }
      },
      {
        path: 'server_config/edit',
        name: 'ServerConfigEdit',
        component: () => import('@/views/server_config/ServerConfigEdit'),
        hidden: true,
        meta: {
          title: 'server_config_edit',
          permission: 'server_config'
        }
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/admin/Admin'),
        meta: {
          title: 'admin',
          permission: 'admin_management',
          cached: true
        }
      },
      {
        path: 'admin/create',
        name: 'AdminCreate',
        hidden: true,
        component: () => import('@/views/admin/AdminCreate'),
        meta: {
          title: 'admin_create',
          permission: 'admin_management',
          tagsView: false
        }
      },
      {
        path: 'admin/edit/:id',
        name: 'AdminEdit',
        hidden: true,
        component: () => import('@/views/admin/AdminEdit'),
        meta: {
          title: 'admin_edit',
          permission: 'admin_management',
          tagsView: false
        }
      }
    ]
  },
  // {
  //   path: '/player',
  //   component: Layout,
  //   name: 'PlayerManagement',
  //   meta: {
  //     title: 'player',
  //     icon: 'el-icon-user'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Player',
  //       component: () => import('@/views/player/Player'),
  //       meta: {
  //         title: 'player_index',
  //         permission: 'player_management',
  //         cached: true
  //       }
  //     },
  //     {
  //       path: 'detail',
  //       name: 'PlayerDetail',
  //       component: () => import('@/views/player/PlayerDetail'),
  //       hidden: true,
  //       meta: {
  //         title: 'player_detail',
  //         permission: 'player_management'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/setting',
  //   component: Layout,
  //   name: 'SettingManagement',
  //   meta: {
  //     title: 'setting',
  //     icon: 'el-icon-setting'
  //   },
  //   alwaysShow: true,
  //   children: [
  //     {
  //       path: '/game',
  //       name: 'Setting',
  //       component: () => import('@/views/setting/Setting'),
  //       meta: {
  //         title: 'game_setting',
  //         permission: 'game_setting',
  //         cached: true
  //       }
  //     },
  //     {
  //       path: '/mail',
  //       name: 'Mail',
  //       component: () => import('@/views/mail/Mail'),
  //       meta: {
  //         title: 'mail',
  //         permission: 'email'
  //       }
  //     }
  //   ]
  // }
]

export const asyncRoutes = customRoutes.concat(IgnoreRouteArray)

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
