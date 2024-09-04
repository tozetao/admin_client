import request from '@/utils/request'
import exportExcel from '@/utils/export-excel'
// import { translate } from '@/utils/i18n'

export const CoinLog = 1
export const DiamondLog = 2
export const TicketLog = 3
export const ShareCoinLog = 4
export const ShareTicketLog = 5

export function fetchGameLogs(params) {
  return request({
    url: '/game_log',
    method: 'get',
    params
  })
}

export function translateType(value) {
  value = Number(value)
  const options = typeOptions(false)
  const rest = options.filter(item => {
    return item.value === value
  })
  if (rest && rest.length === 1) {
    return rest[0].label
  }
  return '-'
}

export const BackendSend = 1
export const GMModifyData = 2
export const BackendRecharge = 3
export const MachineRefund = 4
export const AutoRefund = 5
export const TakeSeat = 1103
export const PutCoin = 1114
export const DailyTaskReward = 1117
export const AchievementAwards = 1118
export const SignIn = 1178
export const GetRestReward = 1186
export const GetTaskReward = 1185
export const ReceiveEmail = 1505
export const Lock = 1139
export const ThirdPartyExchange = 1150
export const MailReward = 1502
export const DollToTicket = 1140
export const ShopExchange = 1302
export const BindPhone = 1138
export const FriendReward = 1125
export const ExchangeTicket = 1123

export function typeOptions(withDefaultValue = true) {
  const list = [
    { label: '后台赠送', value: BackendSend },
    { label: 'GM修改数据', value: GMModifyData },
    { label: '后台充值', value: BackendRecharge },
    { label: '机器退票', value: MachineRefund },
    { label: '自动退票', value: AutoRefund },
    { label: '房间占位', value: TakeSeat },
    { label: '房间内投币', value: PutCoin },
    { label: '每日任务奖励', value: DailyTaskReward
    },
    { label: '成就奖励', value: AchievementAwards },
    { label: '票兑换', value: ExchangeTicket },
    { label: '好友福利', value: FriendReward },
    { label: '绑定手机', value: BindPhone },
    { label: '商城兑换', value: ShopExchange },
    { label: '娃娃对换票', value: DollToTicket },
    { label: '邮件奖励', value: MailReward },
    { label: '第三方兑换', value: ThirdPartyExchange },
    { label: '锁机', value: Lock },
    { label: '邮件领取', value: ReceiveEmail },
    { label: '领取任务奖励', value: GetTaskReward },
    { label: '领取任务额外奖励', value: GetRestReward },
    { label: '签到', value: SignIn }
    // 1185：领取任务奖励，1186：领取任务额外奖励，1178：签到。
  ]
  if (withDefaultValue) {
    list.unshift({
      label: '请选择',
      value: null
    })
  }
  return list
}

export function fetchRewardLogs(params) {
  return request({
    url: '/reward_log',
    method: 'get',
    params
  })
}

export function fetchBonusLogs(params) {
  return request({
    url: '/bonus_log',
    method: 'get',
    params
  })
}

export function exportRewardLogs(params) {
  return exportExcel({
    url: '/reward_log/export',
    method: 'get',
    params
  })
}

export function exportGameLogs(params) {
  return exportExcel({
    url: '/game_log/export',
    method: 'get',
    params
  })
}
