<template>
  <div>
    <div>
      <el-table :data="list" border class="m-t-s">
        <el-table-column prop="type" :label="$t('common.type')" align="center">
          <template slot-scope="{row}">
            {{ row.type | filterType }}
          </template>
        </el-table-column>
        <el-table-column prop="appid" label="APPID" align="center" />
        <el-table-column prop="appkey" label="密钥" align="center" />
        <el-table-column :label="$t('common.operate')" align="center" width="200">
          <template slot-scope="{row}">
            <div class="operation_buttons">
              <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
              <!-- <el-link type="info" @click="onDelete(row.day)">{{ $t('common.delete') }}</el-link> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑授权配置" :visible.sync="visible" width="500px">
      <el-form label-width="120px">
        <!-- <el-form-item :label="$t('common.type')">
          <el-input v-model="form.type" disabled />
        </el-form-item> -->
        <el-form-item label="APPID">
          <el-input v-model="form.appid" />
        </el-form-item>
        <el-form-item label="密钥">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit()">{{ $t('common.save') }}</el-button>
          <el-button plain @click="visible = false">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/wechat_authorization'

export default {
  name: 'WechatAuthorization',
  filters: {
    filterType(value) {
      value = Number(value)
      if (value === 1) {
        return '登录'
      }
      return '-'
    }
  },
  data() {
    return {
      visible: false,
      form: {
        id: 0,
        type: '',
        appid: '',
        key: ''
      },
      loading: false,
      list: []
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.list = data
      })
    },
    onEdit(row) {
      console.log(this.filters)
      this.form.id = row.id
      this.form.type = row.type
      this.form.key = row.appkey
      this.form.appid = row.appid
      this.visible = true
    },
    submit() {
      this.loading = true
      update(this.form).then(() => {
        this.fetchData()
        this.visible = false
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>