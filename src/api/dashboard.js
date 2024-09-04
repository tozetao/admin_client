import request from '@/utils/request'
import exportExcel from '@/utils/export-excel'

export function dashboardData(data) {
  return request({
    url: '/dashboard',
    method: 'get',
    params: data
  })
}

// 导出主页数据
export function exportDashboard(params) {
  return exportExcel({
    url: '/dashboard',
    method: 'get',
    params: Object.assign(params, {
      is_export: 1
    })
  })
}
