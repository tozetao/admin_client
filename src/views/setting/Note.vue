<template>
  <div>
    <div class="text-right">
      <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
    </div>
    <el-table :data="list" border class="m-t-s">
      <el-table-column prop="id" label="ID" align="center" width="80" />
      <el-table-column prop="title" :label="$t('common.title')" align="center" />
      <el-table-column prop="content" :label="$t('common.content')" align="center" />
      <!-- <el-table-column prop="sort" label="排序" align="center" /> -->
      <el-table-column :label="$t('common.operate')" align="center" width="200">
        <template slot-scope="{row}">
          <div class="operation_buttons">
            <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            <el-link type="info" @click="onDelete(row)">{{ $t('common.delete') }}</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>
    
    <el-dialog :title="dialogTitle" :visible.sync="visible" width="500px">
      <el-form label-width="120px">
        <el-form-item :label="$t('common.title')" required>
          <el-input v-model="form.title" type="text" rows="6" />
        </el-form-item>
        <el-form-item :label="$t('common.content')" required>
          <el-input v-model="form.content" type="textarea" rows="6" />
        </el-form-item>
        <!-- <el-form-item label="排序">
          <el-input v-model="form.sort" type="number" />
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="submit()">{{ $t('common.save') }}</el-button>
          <el-button plain @click="visible = false">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, update, create, deleteNote } from '@/api/note'

const Create = 1
const Edit = 2

export default {
  name: 'Note',
  data() {
    return {
      loading: false,
      visible: false,
      form: {
        id: '',
        title: '',
        content: '',
        sort: ''
      },
      list: []
    }
  },
  computed: {
    dialogTitle() {
      return this.operate === Create ? '新建通告' : '编辑通告'
    }
  },
  methods: {
    fetchData(query) {
      fetchData(query).then(response => {
        const { data } = response
        this.list = data
      })
    },
    create() {
      this.visible = true
      this.operate = Create
      this.form = {
        id: '',
        title: '',
        content: '',
        sort: ''
      }
    },
    onEdit(row) {
      this.operate = Edit
      this.visible = true
      this.form.id = row.id
      this.form.sort = row.sort
      this.form.content = row.content
      this.form.title = row.title
    },
    onDelete(row) {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          deleteNote(row.id).then(() => {
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
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      } else {
        update(this.form).then(() => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
}
</script>

<style>

</style>