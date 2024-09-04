<template>
  <div>
    <div class="inline-filter">
      <div class="item">
        <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
      </div>
    </div>

    <el-table :data="list" border class="m-t-s">
      <!-- 名次 -->
      <el-table-column prop="completed_num" label="任务完成数量" align="center" width="150" />
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
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="dialog">
      <el-dialog title="编辑任务奖励" :visible.sync="visible" width="500px">
        <div class="dialog-form">
          <el-form label-position="left" label-width="120px">
            <el-form-item label="任务完成数量">
              <el-input v-model="form.completed_num" type="number" disabled />
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
import { fetchData, update } from '@/api/week_task_reward'

export default {
  name: 'WeekTask',
  data() {
    return {
      visible: false,
      loading: false,
      list: [],
      form: {
        id: '',
        completed_num: '',
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
    onEdit(row) {
      this.form.id = row.id
      this.form.completed_num = row.completed_num
      this.form.reward_type = row.reward_type
      this.form.num = row.num
      this.visible = true
    },
    submit() {
      this.loading = true
      update(this.form).then(response => {
        this.fetchData()
        this.loading = false
        this.visible = false
        this.$message.success(response.message)
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    onSearch() {
      this.fetchData(this.query)
    },
    translateCurrentyType,
    currencyTypeOptions
  }
}
</script>

<style lang="scss">
</style>
