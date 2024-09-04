<template>
  <div>
    <div>
      <el-table v-loading="loading" :data="list" border class="m-t-s">
        <el-table-column prop="name" label="名字" align="center" />
        <el-table-column :label="$t('common.operate')" align="center">
          <template slot-scope="{row}">
            <div class="operation_buttons">
              <el-button type="primary" @click="onEdit(row)">编辑</el-button>
              <el-button type="primary" icon="el-icon-sort-up" size="mini" @click="onUp(row)" />
              <el-button type="primary" icon="el-icon-sort-down" size="mini" @click="onDown(row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑分类" :visible.sync="visible" :close-on-click-modal="false" width="500px">
      <el-form label-width="120px">
        <el-form-item label="名字">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="buttonLoading" @click="submit()">{{ $t('common.save') }}</el-button>
          <el-button plain @click="visible = false">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/category'

export default {
  name: 'Category',
  data() {
    return {
      visible: false,
      form: {
        classify: '',
        name: ''
      },
      loading: false,
      buttonLoading: false,
      list: []
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.list = data.map(item => {
          const parts = item.split(':')
          return {
            classify: parts[0],
            name: parts[1]
          }
        })
      })
    },
    getIndex(classifyId) {
      let index = 0
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        if (Number(item.classify) === Number(classifyId)) {
          index = i
        }
      }
      return index
    },
    onUp(row) {
      const index = this.getIndex(row.classify)
      const prevIndex = index - 1
      if (prevIndex < 0) {
        this.$message('当前是第一项.')
        return
      }
      this.list.splice(prevIndex, 2, row, this.list[prevIndex])
      this.updateSorting()
    },
    onDown(row) {
      const index = this.getIndex(row.classify)
      const nextIndex = index + 1
      if (nextIndex >= this.list.length) {
        this.$message('当前是最后一项.')
        return
      }
      this.list.splice(index, 2, this.list[nextIndex], row)
      this.updateSorting()
    },
    getBuildData() {
      const data = []
      this.list.forEach(item => {
        data.push(item.classify + ':' + item.name)
      })
      return data
    },
    updateSorting() {
      this.loading = true
      update(this.getBuildData()).then(() => {
        this.fetchData()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onEdit(row) {
      console.log(row)
      this.form.classify = row.classify
      this.form.name = row.name
      this.visible = true
    },
    submit() {
      this.buttonLoading = true

      const index = this.getIndex(this.form.classify)
      this.list[index] = {
        classify: this.form.classify,
        name: this.form.name
      }

      update(this.getBuildData()).then(() => {
        this.fetchData()
        this.visible = false
        this.buttonLoading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.buttonLoading = false
      })
    }
  }
}
</script>

<style>
</style>
