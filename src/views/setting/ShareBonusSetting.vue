<template>
  <div class="share-bonus">
    <div class="form-container">
      <el-form label-width="150px" size="small">
        <el-form-item label="分享赠送双方5G币" required>
          <el-input v-model="form.give_coin" type="number" />
        </el-form-item>
        <el-form-item label="平台二维码分享图片">
          <el-upload
            class="uploader img"
            name="image"
            :action="config.uploadAction"
            :multiple="false"
            :show-file-list="false"
            :on-success="onUploadImgSuccess"
            :data="uploadImgData"
          >
            <el-image v-if="form.img" :src="config.assetDir + form.img" fit="contain" class="img" />
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
import { fetchData, update } from '@/api/share_bonus'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'ShareBonusSetting',
  data() {
    return {
      loading: false,
      form: {
        give_diamond: '',
        give_coin: '',
        img: ''
      },
      uploadImgData: {
        api_token: getToken(),
        type: 1
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
      this.form.img = response.data.url
    },
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.form.give_diamond = data.give_diamond
        this.form.give_coin = data.give_coin
        this.form.img = data.share_picture
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
.share-bonus {
  .img .el-upload {
    width: 181px;
    height: 181px;
    line-height: 181px;
  }
}
</style>