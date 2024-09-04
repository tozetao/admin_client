<template>
  <div>
    <div class="text-right" style="width: 880px;">
      <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
      <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
    </div>
    <el-table :data="list" border class="m-t-s">
      <el-table-column prop="id" label="ID" align="center" width="80" />
      <el-table-column prop="title" :label="$t('common.title')" align="center" width="200" />
      <el-table-column prop="sub_title" label="子标题" align="center" width="300" show-overflow-tooltip  />
      <el-table-column label="跳转类型" align="center" width="100">
        <template slot-scope="{ row }">
          {{ translateJumpContent(row.jump_content) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operate')" align="center" width="200">
        <template slot-scope="{row}">
          <div class="operation_buttons">
            <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            <el-link type="info" @click="onDelete(row)">{{ $t('common.delete') }}</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- <el-dialog :title="dialogTitle" :visible.sync="visible" width="500px">
      <el-form label-width="120px">
        <el-form-item :label="$t('common.type')" required>
          <el-select v-model="form.type">
            <el-option v-for="(item, key) in options" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('common.content')" required>
          <el-input v-model="form.content" type="textarea" rows="6" />
        </el-form-item>
        <el-form-item label="CD间隔(秒)">
          <el-input v-model="form.value" type="number" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit()">{{ $t('common.save') }}</el-button>
          <el-button plain @click="visible = false">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<script>
import { fetchData, translateJumpContent, deleteSetting } from '@/api/news_setting'

export default {
  name: 'NewsSetting',
  data() {
    return {
      loading: false,
      visible: false,
      form: {
        id: '',
        content: '',
        type: '',
        value: ''
      },
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
    create() {
      this.$router.push({
        name: 'NewsSettingForm'
      })
    },
    onEdit(row) {
      this.$router.push({
        name: 'NewsSettingForm',
        query: {
          id: row.id
        }
      })
    },
    onDelete(row) {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          deleteSetting(row.id).then(() => {
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
    onSearch() {
      this.fetchData()
    },
    translateJumpContent
  }
}
</script>

<style>

</style>