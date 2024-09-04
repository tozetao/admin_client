<template>
  <div class="base">
    <div class="form-container">
      <el-form label-width="140px" size="small">
        <el-form-item label="新用户奖励">
          <el-input v-model="form.register_bonus" type="number" />
          <span class="form-item_tip">Tip: 奖励5G币</span>
        </el-form-item>
        <el-form-item label="充值链接">
          <el-input v-model="form.recharge_url" type="text" />
        </el-form-item>
        <el-form-item label="加载Icon">
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
          <span class="form-item_tip">注: 尺寸为400px * 160px, 且必须小于100k</span>
        </el-form-item>
        <el-form-item label="娃娃机免费次数">
          <el-input v-model="form.free_draws" />
        </el-form-item>
        <el-form-item label="隐藏炮台分数">
          <el-checkbox v-model="form.shade" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onChange">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <recharge-url-setting />
  </div>
</template>

<script>
import RechargeUrlSetting from '@/views/setting/RechargeUrlSetting.vue'

import { fetchSetting, updateSetting } from '@/api/setting'
import { LoadingIcon } from '@/api/common'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'Base',
  components: {
    RechargeUrlSetting
  },
  data() {
    return {
      form: {
        register_bonus: '',
        recharge_url: '',
        image: '',
        free_draws: 0,
        shade: false
      },
      uploadImgData: {
        api_token: getToken(),
        type: LoadingIcon
      }
    }
  },
  computed: {
    ...mapGetters(['config'])
  },
  methods: {
    fetchData() {
      fetchSetting().then(response => {
        const { data } = response
        this.form.register_bonus = data.register_bonus
        this.form.recharge_url = data.recharge_url
        this.form.image = data.image
        this.form.free_draws = data.free_draws
        this.form.shade = data.shade
      })
    },
    onChange() {
      updateSetting(this.form).then(() => {
        this.$message.success(this.$t('common.success'))
      })
    },
    onUploadImgSuccess(response) {
      if (response.code) {
        this.$message.error(response.message)
        return
      }
      this.form.image = response.data.url
    }
  }
}
</script>

<style lang="scss">
.base {
  .img .el-upload {
    width: 200px;
    height: 80px;
    line-height: 80px;
  }
  .img .uploader-icon {
    font-size: 18px;
  }
}
</style>
