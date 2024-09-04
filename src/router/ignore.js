// import Layout from '@/layout'

const IgnoreRouteArray = [
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true,
    meta: {
      permission: { ignore: true }
    }
  }
]

export default IgnoreRouteArray
