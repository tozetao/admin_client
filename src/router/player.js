import Layout from '@/layout'

const PlayerRoutes = {
  path: '/player',
  component: Layout,
  redirect: '/player/index',
  name: 'player',
  meta: { title: 'player', icon: 'el-icon-basketball' },
  children: [
    {
      path: 'index',
      name: 'Player',
      component: () => import('@/views/player/Player'),
      meta: {
        title: 'player_index',
        permission: 'player_management',
        cached: true
      }
    },
    {
      path: 'create',
      name: 'PlayerCreate',
      component: () => import('@/views/player/PlayerCreate'),
      hidden: true,
      meta: {
        title: 'player_create',
        permission: 'player_management'
      }
    },
    {
      path: 'view/:role_id',
      name: 'PlayerView',
      component: () => import('@/views/player/PlayerDetail'),
      hidden: true,
      meta: {
        title: 'player_view',
        permission: 'player_management'
      },
      props: true
    },
    // {
    //   path: 'sub',
    //   name: 'player.sub',
    //   component: () => import('@/views/player/PlayerSub'),
    //   hidden: true,
    //   meta: {
    //     title: 'sub_players',
    //     permission: 'player_management'
    //   }
    // },
    {
      path: 'game_log',
      name: 'GameLog',
      component: () => import('@/views/report/game_log/GameLog'),
      meta: {
        title: 'game_log',
        permission: 'game_log',
        cached: true
      }
    }
  ]
}

export default PlayerRoutes
