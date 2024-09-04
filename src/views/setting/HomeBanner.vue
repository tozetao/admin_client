<template>
  <div class="home-banner">
    <div class="text-right">
      <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
      <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
    </div>
    <el-table :data="list" border class="m-t-s">
      <!-- 广告图片 -->
      <el-table-column prop="value" label="广告图片" align="center" width="220">
        <template slot-scope="{ row }">
          <el-image :src="config.assetDir + row.cover" fit="contain" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <!-- 广告内容 -->
      <el-table-column prop="content" label="广告内容" align="center" width="300" :show-overflow-tooltip="true" />
      <!-- 跳转类型 -->
      <el-table-column prop="skip_type" :label="$t('startup_banner.jump_type')" align="center" width="150">
        <template slot-scope="{ row }">
          {{ translateJumpType(row.skip_type) }}
        </template>
      </el-table-column>
      <!-- 跳转内容 -->
      <el-table-column prop="skip_content" :label="$t('startup_banner.jump_content')" align="center" width="500" />
      <!-- 排序 -->
      <el-table-column prop="sort" label="排序" align="center" width="80" />
      <el-table-column :label="$t('common.operate')" align="center" width="120">
        <template slot-scope="{row}">
          <div class="operation_buttons">
            <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            <el-link type="info" @click="onDelete(row)">{{ $t('common.delete') }}</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="query.page" :total="total" :page-size="query.page_size" class="m-t-s" @change-page="onChangePage" />

    <el-dialog :title="dialogTitle" :visible.sync="visible" width="500px" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="广告图片" required>
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
          <span class="form-item_tip">注: 图片尺寸为649px * 273px</span>
        </el-form-item>
        <el-form-item label="广告内容">
          <el-input v-model="form.content" type="text" />
        </el-form-item>
        <el-form-item :label="$t('startup_banner.jump_type')">
          <el-select v-model="form.skip_type">
            <el-option v-for="(item, key) in jumpTypeOptions()" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('startup_banner.jump_content')">
          <el-input v-model="form.skip_content" type="text" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" type="number" />
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
import { fetchData, create, update, deleteBanner, translateJumpType, jumpTypeOptions } from '@/api/home_banner'
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { HomeBanner } from '@/api/common'
import Pagination from '@/components/Pagination'

const Create = 1
const Edit = 2

export default {
  name: 'HomeBanner',
  components: {
    Pagination
  },
  data() {
    return {
      form: {
        id: '',
        cover: '',
        skip_type: 0,
        skip_content: '',
        sort: '',
        content: ''
      },
      query: {
        page: 1,
        page_size: 5
      },
      list: [],
      total: 0,
      operate: Create,
      visible: false,
      loading: false,
      uploadData: {
        api_token: getToken(),
        type: HomeBanner
      }
    }
  },
  computed: {
    ...mapGetters(['config']),
    dialogTitle() {
      return this.operate === Create ? '新建轮播广告' : '编辑轮播广告'
    }
  },
  methods: {
    translateJumpType,
    jumpTypeOptions,
    fetchData() {
      fetchData(this.query).then((response) => {
        const { data } = response
        console.log(data)
        this.list = data.list
        this.total = data.total
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
      this.query.page = 1
      this.fetchData()
    },
    onChangePage(value) {
      this.query.page = value
      this.fetchData()
    },
    create() {
      this.visible = true
      this.operate = Create

      this.form.id = ''
      this.form.cover = ''
      this.form.skip_type = ''
      this.form.skip_content = ''
      this.form.sort = 0
    },
    onEdit(row) {
      this.visible = true
      this.operate = Edit
      this.form.id = row.id
      this.form.cover = row.cover
      this.form.skip_type = row.skip_type
      this.form.skip_content = row.skip_content
      this.form.sort = row.sort
    },
    onDelete(row) {
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
.home-banner {
  .banner .el-upload {
    display: block;
    width: 216px;
    height: 91px;
    line-height: 91px;
  }
}
</style>
