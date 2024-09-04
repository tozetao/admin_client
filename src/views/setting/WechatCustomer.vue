<template>
  <div class="wechat-customer">
    <div class="form-container">
      <el-form label-width="150px" size="small">
        <el-form-item label="微信客服二维码">
          <el-upload
            class="uploader img"
            name="image"
            :action="config.uploadAction"
            :multiple="false"
            :show-file-list="false"
            :on-success="onUploadImgSuccess"
            :data="uploadImgData"
          >
            <el-image v-if="form.image" :src="config.assetDir + form.image" fit="contain" class="img" />
            <i v-else class="uploader-icon el-icon-plus" />
          </el-upload>
          <span class="form-item_tip">注: 尺寸为363px * 363px</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/wechat_customer'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { WechatCustomerService } from '@/api/common'

export default {
  name: 'WechatCustomer',
  data() {
    return {
      loading: false,
      form: {
        image: ''
      },
      uploadImgData: {
        api_token: getToken(),
        type: WechatCustomerService
      }
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    onUploadImgSuccess(response) {
      if (response.code) {
        this.$message.error(response.message)
        return
      }
      this.form.image = response.data.url
    },
    fetchData(query) {
      fetchData(query).then(response => {
        const { data } = response
        this.form.image = data.url
      })
    },
    onSubmit() {
      this.loading = true
      update(this.form).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
.wechat-customer {
  .img .el-upload {
    width: 181px;
    height: 181px;
    line-height: 181px;
  }
}
</style>
