<template>
  <div>
    <div class="inline-filter">
      <div class="item">
        <div class="item__content">
          <el-input v-model="query.account" placeholder="管理员账号" />
        </div>
      </div>
      <div class="item">
        <div class="item__content">
          <el-date-picker v-model="query.start" type="date" :placeholder="$t('common.start_time')" />
          <span class="range-separator">-</span>
          <el-date-picker v-model="query.end" type="date" :placeholder="$t('common.end_time')" />
        </div>
      </div>
      <div class="item">
        <div class="item__content">
          <date-query ref="dateQuery" :from="query.start" :to="query.end" class="button" @date-change="onDateChange" />
        </div>
      </div>
      <div class="item">
        <div class="item__content">
          <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
        </div>
      </div>
    </div>
    <!-- table -->
    <div v-loading="listLoading">
      <el-table :data="list" element-loading-text="Loading" :row-style="{ height: '36px' }" border class="m-t-s">
        <el-table-column prop="account" label="后台用户" align="center" />
        <el-table-column prop="title" label="操作" align="center" />
        <el-table-column prop="content" label="操作内容" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="ip" label="IP" align="center" />
        <el-table-column prop="time" label="时间" align="center" />
      </el-table>
      <pagination :page="query.page" :total="total" class="m-t-s" @change-page="onChangePage" />
    </div>
  </div>
</template>

<script>
import { fetchActionLog } from '@/api/admin'
import { filterRequestQuery } from '@/utils/query'
import Pagination from '@/components/Pagination'
import DateQuery from '@/components/DateQuery'

export default {
  name: 'ActionLog',
  components: {
    DateQuery,
    Pagination
  },
  data() {
    return {
      query: {
        account: '',
        start: null,
        end: null,
        page: 1
      },
      listLoading: false,
      list: [],
      total: 0
    }
  },
  created() {
    this.$nextTick(() => {
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchActionLog(filterRequestQuery(this.query)).then(response => {
        this.listLoading = false
        const { data } = response
        this.list = data.list
        this.total = data.total
      }).catch(() => {
        this.listLoading = false
      })
    },
    onChangePage(perPage) {
      this.query.page = perPage
      this.fetchData()
    },
    onSearch() {
      this.query.page = 1
      this.fetchData()
    },
    onSelectServer() {
      this.query.page = 1
      this.fetchData()
    },
    onDateChange({ from, to }) {
      this.query.start = from
      this.query.end = to
      this.query.page = 1
      this.fetchData()
    }
  }
}
</script>
