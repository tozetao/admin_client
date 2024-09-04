<template>
  <div class="recharge-url-setting">
    <div class="form-container">
      <p class="title">充值地址设置</p>
      <el-form label-width="150px" size="small">
        <el-form-item label="域名" required>
          <el-input v-model="form.uri" type="text" disabled />
          <!-- <p class="tip">提示: 类似http://www.xxx.com的域名</p> -->
        </el-form-item>
        <el-form-item label="path" required>
          <el-input v-model="form.path" type="text" />
        </el-form-item>
        <el-form-item label="username" required>
          <el-input v-model="form.username" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button :loading="btnLoading" type="primary" @click="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/setting/recharge_url'

export default {
  name: 'RechargeUrlSetting',
  data() {
    return {
      form: {
        path: '',
        username: '',
        uri: 'http://5gpayup.jiujiuqilu.cn'
      },
      btnLoading: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      fetchData().then(({ data }) => {
        this.form.path = data.path
        this.form.username = data.username
        this.form.uri = data.uri
      })
    },
    submit() {
      this.btnLoading = true
      update(this.form).then(() => {
        this.btnLoading = false
        this.$message.success(this.$t('common.success'))
        this.$emit('success')
      }).catch(() => {
        this.btnLoading = false
      })
    }
  }
}
</script>

<style lang="scss">
.recharge-url-setting {
  margin-top: 26px;

  .form-container {
    margin-top: 26px;
    position: relative;
  }
  .form-container:first-child {
    margin-top: 6px;
  }

  .title {
    position: absolute;
    left: 18px;
    top: -8px;
    color: #606266;
    font-size: 14px;
    background-color: #fff;
    padding: 0;
    margin: 0;
  }
}
</style>