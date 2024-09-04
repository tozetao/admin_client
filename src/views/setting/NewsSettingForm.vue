<template>
  <div class="news-form">
    <div class="form-container">
      <el-form label-width="120px" size="small">
        <el-form-item label="标题" required>
          <el-input v-model="form.title" type="text" />
        </el-form-item>

        <el-form-item label="副标题" required>
          <el-input v-model="form.sub_title" type="text" />
        </el-form-item>
        <el-form-item label="Icon" required>
          <el-upload
            class="uploader icon"
            name="image"
            :action="config.uploadAction"
            :multiple="false"
            :show-file-list="false"
            :on-success="onUploadIconSuccess"
            :data="uploadIconData"
          >
            <el-image v-if="form.icon" :src="config.assetDir + form.icon" fit="contain" class="icon" />
            <i v-else class="uploader-icon el-icon-plus" />
          </el-upload>
          <span class="form-item_tip">提示: 尺寸为120px * 120px</span>
        </el-form-item>
        <el-form-item label="标签" required>
          <el-input v-model="form.label" type="text" />
          <span class="form-item_tip">提示: 最多6个字符</span>
        </el-form-item>
        <el-form-item label="标签颜色" required>
          <el-select v-model="form.label_color">
            <el-option v-for="(item, index) in colorOptions()" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转类型" required>
          <el-select v-model="form.jump_type">
            <el-option v-for="(item, index) in jumpTypeOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转内容">
          <el-select v-if="showJumpContentSelect" v-model="form.jump_content">
            <el-option v-for="(item, index) in jumpContentOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-else v-model="form.jump_content" type="text" />
        </el-form-item>

        <div v-for="(content_setting, key) in form.content_settings" :key="key">
          <el-form-item label="正文图片" required>
            <el-upload
              class="uploader banner"
              name="image"
              :action="config.uploadAction"
              :multiple="false"
              :show-file-list="false"
              :on-success="function(response) { return onUploadSuccess(response, content_setting)}"
              :data="uploadData"
            >
              <el-image v-if="content_setting.picture" :src="config.assetDir + content_setting.picture" fit="contain" class="banner" />
              <i v-else class="uploader-icon el-icon-plus" />
            </el-upload>
            <span class="form-item_tip">提示: 宽度要等于848px</span>
          </el-form-item>
          <el-form-item label="正文文字" required>
            <el-input v-model="content_setting.content" type="textarea" :rows="4" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
          <el-button @click="addContentSetting">新增正文</el-button>
          <el-button @click="goBack()">{{ $t('common.go_back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'

import { jumpTypeOptions, machineTypeOptions, tagTypeOptions, subTagTypeOptions, Tag, SubTag, Machine, News, colorOptions } from '@/api/news_setting'
import { fetchOne, create, update, translateJumpContent, contentToJumpType } from '@/api/news_setting'
import { isInt } from '@/utils'
import { NewsIcon, NewsBanner } from '@/api/common'

const Create = 1
const Edit = 2

export default {
  name: 'NewsSettingForm',
  data() {
    return {
      operate: Create,
      form: {
        id: '',
        title: '',
        icon: '',
        label: '',
        label_color: '',
        sub_title: '',
        jump_type: '',
        // 跳转目标
        jump_content: '',
        content_settings: [
          { picture: '', content: '' }
        ]
      },
      loading: false,
      uploadIconData: {
        api_token: getToken(),
        type: NewsIcon
      },
      uploadData: {
        api_token: getToken(),
        type: NewsBanner
      }
    }
  },
  computed: {
    ...mapGetters(['config']),
    jumpTypeOptions() {
      return jumpTypeOptions().filter(item => {
        return item.value !== News
      })
    },
    jumpContentOptions() {
      if (this.form.jump_type === Tag) {
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
    },
    dialogTitle() {
      return this.operate === Create ? '新建新闻' : '编辑新闻'
    }
  },
  created() {
    this.$nextTick(() => {
      const query = this.$route.query

      if (query.id) {
        this.form.id = query.id
        this.operate = Edit
      }
      if (this.operate === Edit) {
        this.fetchOne(this.form)
      }
    })
  },
  methods: {
    fetchOne(params) {
      fetchOne(params).then(response => {
        const { data } = response
        this.form.id = data.id
        this.form.title = data.title
        this.form.sub_title = data.sub_title
        this.form.icon = data.icon
        this.form.label = data.label
        this.form.label_color = data.label_color
        this.form.jump_type = contentToJumpType(data.jump_content)
        if (isInt(data.jump_content)) {
          this.form.jump_content = Number(data.jump_content)
        } else {
          this.form.jump_content = data.jump_content
        }
        this.form.content_settings = data.content_settings
      })
    },
    addContentSetting() {
      this.form.content_settings.push({
        picture: '',
        content: ''
      })
    },
    resetForm() {
      this.form.id = ''
      this.form.title = ''
      this.form.sub_title = ''
      this.form.jump_type = ''
      this.form.jump_content = ''
      this.form.label = ''
      this.form.label_color = ''
      this.form.icon = ''

      this.form.content_settings = [
        { picture: '', content: '' }
      ]
    },
    onSubmit() {
      this.loading = true
      if (this.operate === Create) {
        create(this.form).then(() => {
          this.resetForm()
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      } else {
        update(this.form).then(() => {
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      }
    },
    onUploadIconSuccess(response) {
      if (response.code) {
        this.$message.error(response.message)
        return
      }
      this.form.icon = response.data.url
    },
    onUploadSuccess(response, obj) {
      if (response.code) {
        this.$message.error(response.message)
        return
      }
      obj.picture = response.data.url
    },
    goBack() {
      this.$router.go(-1)
    },
    translateJumpContent,
    machineTypeOptions,
    tagTypeOptions,
    subTagTypeOptions,
    colorOptions
  }
}
</script>

<style lang="scss">
.news-form {
  .banner .el-upload {
    width: 200px;
    height: 140px;
    line-height: 140px;
  }
  .icon .el-upload {
    width: 120px;
    height: 120px;
    line-height: 120px;

    .uploader-icon {
      font-size: 20px;
    }
  }
}
</style>
