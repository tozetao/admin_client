<template>
  <div class="startup-banner">
    <div class="text-right" style="width: 930px;">
      <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
      <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
    </div>
    <el-table :data="list" border class="m-t-s">
      <!-- 公告图片 -->
      <el-table-column prop="value" label="CD间隔(秒)" align="center" width="220">
        <template slot-scope="{ row }">
          <el-image :src="config.assetDir + row.cover" fit="contain" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <!-- 跳转类型 -->
      <el-table-column prop="jump_type" :label="$t('startup_banner.jump_type')" align="center" width="150">
        <template slot-scope="{ row }">
          {{ translateJumpType(row.jump_type) }}
        </template>
      </el-table-column>
      <!-- 跳转内容 -->
      <el-table-column prop="jump_content" :label="$t('startup_banner.jump_content')" align="center" width="500">
        <template slot-scope="{ row }">
          {{ translateJumpContent(row.jump_content) }}
        </template>
      </el-table-column>

      <el-table-column :label="$t('common.operate')" align="center" width="100">
        <template slot-scope="{row}">
          <div class="operation_buttons">
            <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            <el-link type="info" @click="onDelete(row)">{{ $t('common.delete') }}</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog :title="dialogTitle" :visible.sync="visible" width="500px" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="Banner" required>
          <el-upload
            class="uploader banner"
            name="image"
            :action="config.uploadAction"
            :multiple="false"
            :show-file-list="false"
            :on-success="onUploadSuccess"
            :data="uploadData"
          >
            <el-image v-if="form.cover" :src="config.assetDir + form.cover" fit="contain" class="banner" />
            <i v-else class="uploader-icon el-icon-plus" />
          </el-upload>
          <span class="form-item_tip">注: 尺寸不能超过740px * 1300px</span>
        </el-form-item>
        <el-form-item :label="$t('startup_banner.jump_type')" required>
          <el-select v-model="form.jump_type">
            <el-option v-for="(item, key) in jumpTypeOptions()" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('startup_banner.jump_content')">
          <el-select v-if="showJumpContentSelect" v-model="form.jump_content">
            <el-option v-for="(item, index) in jumpContentOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-else v-model="form.jump_content" type="text" />
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
import { fetchData, create, update, deleteBanner } from '@/api/startup_banner'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { StartupBannerImage } from '@/api/common'
import { jumpTypeOptions, translateJumpType, translateJumpContent, machineTypeOptions, tagTypeOptions, subTagTypeOptions, Tag, SubTag, Machine } from '@/api/news_setting'
import { isInt } from '@/utils'

const Create = 1
const Edit = 2

export default {
  name: 'StartupBanner',
  data() {
    return {
      form: {
        id: '',
        cover: '',
        jump_type: '',
        jump_content: ''
      },
      list: [],
      operate: Create,
      visible: false,
      loading: false,
      uploadData: {
        api_token: getToken(),
        type: StartupBannerImage
      }
    }
  },
  computed: {
    ...mapGetters(['config']),
    dialogTitle() {
      return this.operate === Create ? '新建开屏公告' : '编辑开屏公告'
    },
    jumpContentOptions() {
      if (this.form.jump_type === Tag ) {
        return tagTypeOptions()
      }
      if (this.form.jump_type === SubTag) {
        return subTagTypeOptions()
      }
      if (this.form.jump_type === Machine) {
        return machineTypeOptions()
      }
      return []
    },
    showJumpContentSelect() {
      const types = [Tag, SubTag, Machine]
      return types.indexOf(this.form.jump_type) !== -1
    }
  },
  methods: {
    translateJumpType,
    translateJumpContent,
    jumpTypeOptions,
    machineTypeOptions,
    tagTypeOptions,
    subTagTypeOptions,
    fetchData() {
      fetchData().then((response) => {
        const { data } = response
        this.list = data
      })
    },
    onUploadSuccess(response) {
      if (response.code) {
        this.$message.error(response.message)
        return
      }
      this.form.cover = response.data.url
    },
    onSearch() {
      this.fetchData()
    },
    create() {
      this.visible = true
      this.operate = Create

      this.form.id = '',
      this.form.cover = '',
      this.form.jump_type = '',
      this.form.jump_content = ''
    },
    onEdit(row) {
      this.visible = true
      this.operate = Edit
      this.form.id = row.id
      this.form.cover = row.cover
      this.form.jump_type = row.jump_type
      if (isInt(row.jump_content)) {
        this.form.jump_content = Number(row.jump_content)
      } else if (row.jump_content.indexOf('news:') !== -1) {
        this.form.jump_content = row.jump_content.replace('news:', '')
      } else {
        this.form.jump_content = row.jump_content
      }
    },
    onDelete(row) {
      console.log(row)
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = function(action, instance, done) {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          deleteBanner(row.id).then(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirmButtonText
            done()
            this.$message.success(this.$t('common.success'))
          }).catch(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirmButtonText
            done()
          })
        } else {
          done()
        }
      }
      this.$confirm(this.$t('common.delete_tip'), this.$t('common.tips'), {
        confirmButtonText,
        cancelButtonText,
        type: 'warning',
        center: true,
        beforeClose
      }).then(() => {
        this.fetchData()
      })
    },
    submit() {
      this.loading = true
      if (this.operate === Create) {
        create(this.form).then(() => {
          this.fetchData()
          this.visible = false
          this.loading = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      } else {
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
}
</script>

<style lang="scss">
.startup-banner {
  .banner .el-upload {
    display: block;
    width: 185px;
    height: 325px;
    line-height: 325px;
  }
}
</style>
