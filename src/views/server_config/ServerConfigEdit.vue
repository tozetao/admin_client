<template>
  <div>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <!-- 服务器名称 -->
        <el-form-item :label="$t('common.server_name')" required>
          <el-input v-model="form.server_name" type="text" />
        </el-form-item>
        <el-form-item :label="$t('common.mch_id')" required>
          <el-input v-model="form.mch_id" type="text" />
        </el-form-item>
        <el-form-item :label="$t('common.third_party_platform')" required>
          <el-select v-model="form.platform_type">
            <el-option v-for="(item, key) in platformTypeOptions()" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <!-- 代理类型 -->
        <el-form-item :label="$t('common.agent')" required>
          <el-select v-model="form.agent_type">
            <el-option v-for="(item, key) in agentTypeOptions()" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="平台过期时间">
          <el-date-picker v-model="form.expired_at" type="datetime" placeholder="选择日期" />
          <span class="form-item_tip">Tip: 不选择日期默认不限制</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { platformTypeOptions, update, fetchServerConfig, agentTypeOptions } from '@/api/server_config'
import { parseTime } from '@/filter'

export default {
  name: 'ServerConfigEdit',
  data() {
    return {
      form: {
        agent_type: null,
        server_name: '',
        server_no: '',
        mch_id: '',
        platform_type: 0,
        expired_at: null
      },
      loading: false
    }
  },
  created() {
    this.$nextTick(() => {
      const id = this.$route.query.id
      this.form.server_no = id
      this.fetchData()
    })
  },
  methods: {
    fetchData() {
      fetchServerConfig(this.form.server_no).then(response => {
        const { data } = response
        this.form.server_name = data.server_name
        this.form.server_no = data.server_no
        this.form.mch_id = data.mch_id
        this.form.platform_type = data.platform_type
        this.form.agent_type = data.agent_type
        if (data.expired_at) {
          this.form.expired_at = new Date(data.expired_at * 1000)
        } else {
          this.form.expired_at = null
        }
      })
    },
    onSubmit() {
      this.loading = true
      this.form.expired_at = parseTime(this.form.expired_at)
      update(this.form).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    },
    platformTypeOptions,
    agentTypeOptions
  }
}
</script>

<style>

</style>