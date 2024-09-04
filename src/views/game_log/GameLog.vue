<template>
  <div class="game-log">
    <div class="filter-collapse">
      <el-collapse v-model="activeName">
        <el-collapse-item name="1">
          <span slot="title" class="collapse-title">Filters</span>
          <div class="filter-wrapper">
            <div class="filter">
              <div class="filter__field">
                <div class="field">
                  <label>货币类型</label>
                  <div>
                    <el-select v-model="query.model_type">
                      <el-option v-for="item in modelTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="filter__field">
                <div class="field">
                  <label>机台</label>
                  <div>
                    <el-select v-model="query.machine_id" :filterable="true">
                      <el-option v-for="(item, index) in machineOptions" :key="index" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
              <!-- 操作类型 -->
              <div class="filter__field">
                <div class="field">
                  <label>操作类型</label>
                  <div>
                    <el-select v-model="query.type">
                      <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="filter__field">
                <div class="field">
                  <label>{{ $t('common.player_id') }}</label>
                  <div>
                    <el-input v-model="query.player_id" name="player_id" size="small" />
                  </div>
                </div>
              </div>
              <div class="filter__datetime">
                <div class="field">
                  <label>{{ $t('common.date') }}</label>
                  <div>
                    <el-date-picker v-model="query.start" type="datetime" placeholder="From Time" />
                    <span class="range-separator">-</span>
                    <el-date-picker v-model="query.end" type="datetime" placeholder="End Time" />
                  </div>
                </div>
              </div>
              <div>
                <date-query ref="dateQuery" :from="query.start" :to="query.end" class="button" @date-change="onDateChange" />
                <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
                <el-button type="primary" @click="onReset">{{ $t('common.reset') }}</el-button>
                <el-button :loading="loading" type="primary" @click="exportData">导出</el-button>
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- table -->
    <div v-loading="listLoading" class="m-t-s">
      <el-table
        :key="0"
        :data="list"
        :height="504"
        :header-cell-style="{background: 'rgb(233, 233, 235)'}"
        :show-summary="true"
        :summary-method="getSummaries"
        border
        fit
        ref="table"
      >
        <el-table-column label="玩家ID" align="center">
          <template slot-scope="{row}">
            {{ row.player_id }}
          </template>
        </el-table-column>
        <el-table-column label="玩家昵称" align="center">
          <template slot-scope="{row}">
            {{ row.player_name }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="操作类型" align="center">
          <template slot-scope="{row}">
            {{ translateType(row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="value_before" label="变更前" align="center" />
        <el-table-column prop="value" label="增加/减少" align="center" />
        <el-table-column prop="value_after" label="变更后" align="center" />
        <el-table-column label="机台信息" align="center">
          <template slot-scope="{row}">
            {{ row.machine_name }}
            <el-image
              v-if="row.md5_image"
              :src="row.md5_image"
              fit="fit"
              style="width: 30px; height: 20px"
              :preview-src-list="[row.md5_image]"
            />
          </template>
        </el-table-column>
        <el-table-column prop="time" :label="$t('common.created_at')" align="center" />
      </el-table>

      <pagination :page="query.page" :total="total" class="m-t-s" :page-sizes="[10, 50, 100, 500, 1000]" @change-page="onChangePage" @change-size="onChangeSize" />
    </div>
  </div>
</template>

<script>
import { SignIn, GetRestReward, GetTaskReward, BackendSend, BackendRecharge, MachineRefund, DailyTaskReward, AchievementAwards, ExchangeTicket, FriendReward, BindPhone, MailReward, ReceiveEmail, DollToTicket, ThirdPartyExchange, AutoRefund } from '@/api/game_log'

import { CoinLog, TicketLog, ShareCoinLog, ShareTicketLog, translateType, typeOptions } from '@/api/game_log'
import { fetchGameLogs, exportGameLogs } from '@/api/game_log'
import { filterRequestQuery } from '@/utils/query'
import { fetchMachineOptions } from '@/api/common'
import CustomSelect from '@/components/CustomSelect'
import DateQuery from '@/components/DateQuery'
import Pagination from '@/components/Pagination'
import { handleExportFile } from '@/utils'

export default {
  name: 'GameLog',
  components: {
    DateQuery,
    Pagination,
    CustomSelect
  },
  data() {
    return {
      // 临时记录传入进来的参数
      tempQuery: {
        player_id: '',
        machine_id: '',
        model_type: null,
        start: null,
        end: null
      },
      activeName: '1',
      query: {
        player_id: '',
        model_type: CoinLog,
        type: null,
        machine_id: null,
        start: null,
        end: null,
        sort: 0,
        direction: 'desc',
        page: 1,
        page_size: 10
      },

      originTypeOptions: [],
      num: 0,
      list: [],
      total: 0,
      addValue: 0,
      costValue: 0,

      listLoading: false,
      back: false,
      machineOptions: [],
      typeOptions: [],
      loading: false
    }
  },
  watch: {
    // 从Player组件进入GameLog组件，如果参数不一致，那么肯定是需要发出请求。如果参数一致，则不发出请求。
    // 之所以用一个tempQuery来保存Url的参数变动，是因为当组件内部的query发生变化时，这是从Player组件再次进入GameLog组件时，就会发出请求，导致当前内容发生变化。
    $route(to, from) {
      const excepts = ['Player', 'Machine', 'Dashboard', 'MachineStatistics']
      let flag = 0
      if (to.name === 'GameLog' && (excepts.indexOf(from.name) !== -1)) {
        // 其实就是Url的Query与tempQuery之间进行对比，如果俩者不一致就需要请求数据。
        if (to.query.player_id !== this.tempQuery.player_id) {
          this.tempQuery.player_id = to.query.player_id
          this.query.player_id = to.query.player_id
          flag = 1
        }

        if (to.query.machine_id !== this.tempQuery.machine_id) {
          this.tempQuery.machine_id = to.query.machine_id
          this.query.machine_id = to.query.machine_id
          flag = 1
        }

        if (to.query.model_type && to.query.model_type !== this.tempQuery.model_type) {
          this.tempQuery.model_type = to.query.model_type
          this.query.model_type = to.query.model_type
          flag = 1
        }

        if (to.query.start && to.query.start !== this.tempQuery.start) { 
          this.tempQuery.start = to.query.start
          this.query.start = new Date(to.query.start * 1000)
          flag = 1
        }

        if (to.query.end && to.query.end !== this.tempQuery.end) { 
          this.tempQuery.end = to.query.end
          this.query.end = new Date(to.query.end * 1000)
          flag = 1
        }

        if (flag) {
          this.query.page = 1
          this.fetchData()
        }
      }
    }
  },
  computed: {
    modelTypeOptions() {
      const coin = this.$t('common.coin')
      const ticket = this.$t('common.ticket')
      // const diamond = this.$t('common.diamond')
      const shareCoin = this.$t('common.share_coin')
      const shareTicket = this.$t('common.share_ticket')
      return [
        { label: coin, value: CoinLog },
        { label: ticket, value: TicketLog },
        { label: shareCoin, value: ShareCoinLog },
        { label: shareTicket, value: ShareTicketLog }
      ]
    }
  },
  created() {
    const query = this.$route.query
    if (query.player_id) {
      this.tempQuery.player_id = query.player_id
      this.query.player_id = query.player_id
    }
    if (query.machine_id) {
      this.tempQuery.machine_id = query.machine_id
      this.query.machine_id = query.machine_id
    }
    if (query.start && query.end) {
      this.tempQuery.start = query.start
      this.query.start = new Date(query.start * 1000)
      this.tempQuery.end = query.end
      this.query.end = new Date(query.end * 1000)
    } else {
      const start = new Date()
      start.setDate(start.getDate() - 6)
      start.setMinutes(0)
      start.setSeconds(0)
      start.setHours(0)
      const end = new Date()
      end.setMinutes(59)
      end.setSeconds(59)
      end.setHours(23)
      this.tempQuery.start = start
      this.query.start = start
      this.tempQuery.end = end
      this.query.end = end
    }

    if (query.model_type) {
      this.tempQuery.model_type = query.model_type
      this.query.model_type = Number(query.model_type)
    }
    this.initTypeOptions()
    this.initMachineOptions()
    this.fetchData()
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.table.doLayout()
    })
  },
  methods: {
    initMachineOptions() {
      const query = {
        server_no: this.$store.getters.defaultScId
      }
      fetchMachineOptions(query).then(response => {
        const { data } = response
        this.machineOptions = data
      })
    },
    initTypeOptions() {
      this.typeOptions = typeOptions()
    },
    onSearch() {
      this.query.page = 1
      this.fetchData()
    },
    onReset() {
      this.query = {
        player_id: '',
        model_type: CoinLog,
        log_type: 0,
        sort: 0,
        direction: 'desc',
        types: null,
        start: null,
        end: null,
        page: 1,
        page_size: 10
      }
      this.fetchData()
    },
    onDateChange({ from, to }) {
      this.query.start = from
      this.query.end = to
      this.query.page = 1
      this.fetchData()
    },
    exportData() {
      this.loading = true
      exportGameLogs(filterRequestQuery(this.query)).then(response => {
        handleExportFile(response)
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    fetchData() {
      this.listLoading = true
      fetchGameLogs(filterRequestQuery(this.query)).then(response => {
        this.listLoading = false
        const { data } = response
        this.list = data.list.map(item => {
          const type = Number(item.type)
          // BackendSend要根据值的正负来判断
          if (type === BackendSend) {
            if (item.add_value > 0) {
              item.value = '+' + item.add_value
            } else {
              item.value = '-' + item.cost_value
            }
            return item
          }
          // ThirdPartyExchange币的第三方兑换+，票的第三方兑换-
          if (type === ThirdPartyExchange) {
            if (this.query.model_type === TicketLog || this.query.model_type === ShareTicketLog) {
              item.value = '-' + item.cost_value
            } else {
              item.value = '+' + item.add_value
            }
            return item
          }
          // const incrTypes = [1, 3, 4, 5, 1117, 1118, 1123, 1125, 1138, 1502, 1505, 1140, 1150]
          const incrTypes = [BackendSend, BackendRecharge, AutoRefund, MachineRefund, DailyTaskReward, AchievementAwards,
            ExchangeTicket, FriendReward, BindPhone, MailReward, ReceiveEmail, DollToTicket, SignIn, GetRestReward, GetTaskReward]
          if (incrTypes.includes(item.type)) {
            item.value = '+' + item.add_value
          } else {
            item.value = '-' + item.cost_value
          }
          return item
        })
        this.total = data.total
        this.addValue = data.add_value
        this.costValue = data.cost_value
      }).catch(() => {
        this.list = []
        this.listLoading = false
      })
    },
    onChangePage(perPage) {
      this.query.page = perPage
      this.fetchData()
    },
    onChangeSize(size) {
      this.query.page = 1
      this.query.page_size = size
      this.fetchData()
    },
    goBack() {
      this.$router.go(-1)
    },
    onTypeSelection(value) {
      if (value) {
        this.query.types = JSON.stringify([value])
      } else {
        this.query.types = JSON.stringify(this.getGameTypes(this.game))
      }
    },
    getSummaries() {
      const content = '+' + this.addValue + '\n-' + this.costValue
      const sum = ['合计', '', '', '', content, '', '', '']
      return sum
    },
    onSelectMachine() {},
    translateType
  }
}
</script>

<style lang="scss">
.game-log {
  .table {
    max-width: 1371px;
    margin-top: 10px;
  }
  .el-table .cell {
    white-space: pre-line;
  }
}
</style>
