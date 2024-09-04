<template>
  <div>
    <div class="inline-filter">
      <div class="item">
        <div class="item__content">
          <el-input v-model="query.keyword" placeholder="服务器ID" />
        </div>
      </div>

      <!-- <div class="item">
        <el-select v-model="query.status" style="width: 110px" @change="onSelectStatus">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="item">
        <el-select v-model="query.view_by" style="width: 150px" @change="onSelectView">
          <el-option v-for="item in viewOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div> -->

      <div class="item">
        <div class="item__content">
          <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
          <el-button v-if="isCentralAdmin" type="primary" @click="goCreate">{{ $t('common.create') }}</el-button>
        </div>
      </div>
    </div>

    <!-- table -->
    <div v-loading="listLoading" class="table-wrapper">
      <el-table :data="list" border>
        <el-table-column label="服务器信息">
          <template slot-scope="{row}">
            <el-row>
              <el-col :span="24">编号：{{ row.server_no }}</el-col>
              <el-col :span="24">名称：{{ row.server_name }}</el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column label="平台类型">
          <template slot-scope="{row}">
            {{ row.platform_type | translatePlatformType }}
          </template>
        </el-table-column>

        <el-table-column label="代理类型">
          <template slot-scope="{row}">
            {{ row.agent_type | translateAgentType }}
          </template>
        </el-table-column>

        <el-table-column label="地址信息" width="400">
          <template slot-scope="{row}">
            <el-row>
              <el-col :span="24">后台地址：<a :href="row.url" target="_blank">{{ row.url }}</a></el-col>
              <el-col :span="24">手机地址：{{ row.phone_url }}</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="stream_url" label="推流地址：" />
        <el-table-column prop="expired_at_str" label="过期时间" />
        <el-table-column prop="created_at_str" label="创建时间" />
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <el-link v-if="isCentralAdmin" @click="toEdit(row.server_no)">编辑</el-link>
          </template>
        </el-table-column>
      </el-table>
      <pagination :page="query.page" :total="total" class="m-t-x" @change-page="onChangePage" />
    </div>
  </div>
</template>

<script>
import { fetchServerConfigs, translateAgentType, translatePlatformType } from '@/api/server_config'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'

export default {
  name: 'ServerConfig',
  components: {
    Pagination
  },
  filters: {
    translateAgentType,
    translatePlatformType
  },
  data() {
    return {
      query: {
        keyword: '',
        page: 1
      },
      listLoading: false,
      list: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['isCentralAdmin'])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchServerConfigs(this.query).then(response => {
        this.listLoading = false
        const { data } = response
        this.list = data.list
        this.total = data.total
      })
    },
    onSearch() {
      this.query.page = 1
      this.fetchData()
    },
    onChangePage(perPage) {
      this.query.page = perPage
      this.fetchData()
    },
    goCreate() {
      this.$router.push({
        name: 'ServerConfigCreate'
      })
    },
    toEdit(id) {
      this.$router.push({
        name: 'ServerConfigEdit',
        query: { id }
      })
    }
  }
}
</script>

<style>

</style>