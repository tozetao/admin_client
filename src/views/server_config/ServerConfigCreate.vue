<template>
  <div>
    <div class="form-container">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <!-- 服务器名称 -->
        <el-form-item :label="$t('common.server_name')" required>
          <el-input v-model="form.server_name" type="text" />
        </el-form-item>
        <el-form-item :label="$t('common.stream_url')" required>
          <el-input v-model="form.stream_url" type="text" />
        </el-form-item>
        <el-form-item :label="$t('common.mch_id')" required>
          <el-input v-model="form.mch_id" type="text" />
        </el-form-item>
        <el-form-item :label="$t('common.merge_room')" required>
          <el-select v-model="form.merge_room">
            <el-option label="是" :value="1" />
            <el-option label="否" :value="0" />
          </el-select>
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
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.create') }}</el-button>
          <el-button @click="goBack()">{{ $t('common.go_back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { platformTypeOptions, agentTypeOptions, createServerConfig, SelfOperated } from '@/api/server_config'

export default {
  name: 'ServerConfigCreate',
  data() {
    return {
      form: {
        server_name: '',
        stream_url: '',
        mch_id: '',
        platform_type: 0,
        agent_type: SelfOperated,
        merge_room: 1
      },
      loading: false
    }
  },
  methods: {
    platformTypeOptions,
    agentTypeOptions,
    onSubmit() {
      this.loading = true
      createServerConfig(this.form).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
        this.resetForm()
      }).catch(() => {
        this.loading = false
      })
    },
    resetForm() {
      this.form = {
        server_name: '',
        stream_url: '',
        mch_id: '',
        platform_type: null,
        agent_type: null,
        merge_room: 1
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>