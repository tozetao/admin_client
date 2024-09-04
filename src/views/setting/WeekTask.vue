<template>
  <div>
    <div class="inline-filter">
      <div class="item">
        <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
        <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
      </div>
    </div>

    <el-table :data="list" border class="m-t-s">
      <el-table-column prop="type" label="任务类型" align="center" width="150">
        <template slot-scope="{row}">
          {{ translateType(row.type) }}
        </template>
      </el-table-column>
      <!-- 名次 -->
      <el-table-column prop="target_num" label="任务目标数量" align="center" width="150" />
      <!-- 奖励类型 -->
      <el-table-column prop="reward_type" :label="$t('common.reward_type')" align="center" width="150">
        <template slot-scope="{row}">
          {{ translateCurrentyType(row.reward_type) }}
        </template>
      </el-table-column>
      <!-- 奖励金额 -->
      <el-table-column prop="num" :label="$t('common.reward_amount')" align="center" width="150" />
      <el-table-column :label="$t('common.operate')" align="center" width="200">
        <template slot-scope="{row}">
          <div class="operation_buttons">
            <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            <el-link type="info" @click="onDelete(row)">{{ $t('common.delete') }}</el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <el-dialog title="编辑设置" :visible.sync="visible" width="500px">
        <div class="dialog-form">
          <el-form label-position="left" label-width="120px">
            <el-form-item label="任务类型">
              <el-select v-model="form.type">
                <el-option v-for="(item, key) in typeOptions()" :key="key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="任务目标数量">
              <el-input v-model="form.target_num" type="number" />
            </el-form-item>
            <el-form-item :label="$t('common.reward_type')">
              <el-select v-model="form.reward_type">
                <el-option v-for="(item, key) in currencyTypeOptions()" :key="key" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('common.reward_amount')">
              <el-input v-model="form.num" type="number" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="submit()">{{ $t('common.save') }}</el-button>
              <el-button plain @click="visible = false">{{ $t('common.cancel') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { currencyTypeOptions, translateCurrentyType } from '@/api/machine'
import { fetchData, update, create, deleteTask, typeOptions, translateType } from '@/api/week_task'

const Create = 1
const Edit = 2

export default {
  name: 'WeekTask',
  data() {
    return {
      operate: Create, 
      visible: false,
      loading: false,
      list: [],
      form: {
        id: '',
        type: '',
        target_num: '',
        reward_type: '',
        num: ''
      }
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
    },
    onEdit(row) {
      this.form.id = row.id
      this.form.type = row.type
      this.form.target_num = row.target_num
      this.form.reward_type = row.reward_type
      this.form.num = row.num
      this.visible = true
      this.operate = Edit
    },
    submit() {
      this.loading = true
      if (this.operate === Create) {
        create(this.form).then(response => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(response.message)
        }).catch(() => {
          this.loading = false
        })
      } else {
        update(this.form).then(response => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(response.message)
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    onSearch() {
      this.fetchData(this.query)
    },
    onDelete(row) {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          deleteTask({
            id: row.id
          }).then(() => {
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
        const rest = (this.total - 1) % this.query.page_size
        if (rest === 0 && this.query.page > 1) {
          this.query.page -= 1
        }
        this.fetchData()
      })
    },
    translateCurrentyType,
    currencyTypeOptions,
    typeOptions,
    translateType
  }
}
</script>

<style lang="scss">
</style>
