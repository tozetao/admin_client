<template>
  <div class="admin">
    <div class="inline-filter">
      <div class="item">
        <label for="account">{{ $t('common.account') }}</label>
        <div class="item__content">
          <el-input v-model="query.account" name="account" />
        </div>
      </div>

      <div class="item">
        <el-select v-model="query.status" style="width: 110px" @change="onSelectStatus">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="item">
        <el-select v-model="query.view_by" style="width: 150px" @change="onSelectView">
          <el-option v-for="item in viewOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="item">
        <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
      </div>
      <div class="item">
        <el-button type="primary" @click="goCreate">{{ $t('common.create') }}</el-button>
      </div>
      <div class="item">
        <el-button type="primary" @click="onChangeStatus">启用/禁用</el-button>
      </div>
    </div>

    <!-- table -->
    <div v-loading="listLoading" class="table-wrapper">
      <el-table
        :data="list"
        element-loading-text="Loading"
        :row-style="{ height: '36px' }"
        border
        fit
        @selection-change="onSelectRow"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" :label="$t('common.id')" align="center" width="100" />
        <el-table-column prop="account" :label="$t('common.account')" align="center" width="120" />
        <el-table-column prop="parent" :label="$t('common.parent_account')" align="center" width="150" />

        <el-table-column :label="$t('common.status')" align="center" width="80">
          <template slot-scope="{row}">
            <span :class="row.status ? 'disable': 'active'">{{ translateStatus(row.status) }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="created_at" :label="$t('common.created_at')" align="center" width="200" />

        <el-table-column align="center" :label="$t('common.operation')" width="200">
          <template slot-scope="{row}">
            <el-link icon="el-icon-edit" @click="goEdit(row)">{{ $t('common.edit') }}</el-link>
          </template>
        </el-table-column>
      </el-table>

      <pagination :page="query.page" :total="total" class="m-t-x" @change-page="onChangePage" />
    </div>
  </div>
</template>

<script>
import { fetchAdmins, translateStatus, changeStatus, Enabled, Disabled } from '@/api/admin'
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

const ViewMy = 'my'
const ViewAll = 'all'

export default {
  name: 'Admin',
  components: {
    Pagination
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'AdminEdit') {
      next(vm => {
        vm.fetchAdmins()
      })
      return
    }
    if (from.name === 'AdminCreate') {
      next(vm => {
        vm.onSearch()
      })
      return
    }
    next()
  },
  data() {
    return {
      query: {
        account: '',
        status: null,
        view_by: ViewMy,
        page: 1
      },
      list: [],
      total: 0,
      listLoading: false,
      operation: 0,
      multiSelection: [],
      loading: false
    }
  },
  computed: {
    ...mapGetters(['isCentralAdmin', 'user']),
    statusOptions() {
      return [
        { label: this.$t('common.please_select'), value: null },
        { value: Enabled, label: this.$t('common.enable') },
        { value: Disabled, label: this.$t('common.disable') }
      ]
    },
    viewOptions() {
      return [
        { value: ViewMy, label: this.$t('admin.view_my') },
        { value: ViewAll, label: this.$t('admin.view_all') }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      this.fetchAdmins()
    })
  },
  methods: {
    onChangeStatus() {
      const statuses = []
      this.multiSelection.forEach(row => {
        statuses.push([row.id, row.status === Enabled ? Disabled : Enabled])
      })
      const confirm = this.$t('common.confirm')
      const cancel = this.$t('common.cancel')

      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          changeStatus(statuses).then(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirm
            this.$message.success(this.$t('common.update_successful'))
            console.log('handle response')
            done()
          }).catch(() => {
            console.log('handle error')
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirm
            done()
          })
        } else {
          done()
        }
      }

      this.$confirm(this.$t('admin.change_status_tip'), this.$t('common.tips'), {
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        beforeClose: beforeClose
      }).then(() => {
        this.fetchAdmins()
        this.multiSelection = []
      }).catch(() => {})
    },
    fetchAdmins() {
      this.listLoading = true
      fetchAdmins(this.query).then((response) => {
        const { data } = response
        this.list = data.models
        this.total = data.count
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    onSearch() {
      this.query.page = 1
      this.fetchAdmins()
    },
    onChangePage(perPage) {
      this.query.page = perPage
      this.fetchAdmins()
    },
    onSelectStatus(value) {
      this.query.status = value
      this.fetchAdmins()
    },
    onSelectView(value) {
      this.query.view_by = value
      this.fetchAdmins()
    },
    goCreate() {
      this.$router.push({
        name: 'AdminCreate'
      })
    },
    goEdit(row) {
      this.$router.push({
        name: 'AdminEdit',
        params: {
          id: row.id
        }
      })
    },
    onSelectRow(value) {
      this.multiSelection = value
    },
    translateStatus
  }
}
</script>

<style lang="scss">
.admin {
  .active {
    color: #f4a460;
  }
  .table-wrapper {
    max-width: 1050px;
    margin-top: 10px;
  }
}
</style>>
