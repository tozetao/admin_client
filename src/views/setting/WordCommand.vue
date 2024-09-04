<template>
  <div>
    <div>
      <div class="text-right">
        <el-button type="primary" @click="onSearch">{{ $t('common.search') }}</el-button>
        <el-button type="primary" @click="create">{{ $t('common.create') }}</el-button>
      </div>
      <el-table :data="list" border class="m-t-s">
        <el-table-column prop="command" label="口令" align="center" width="150" />
        <el-table-column prop="player_num" label="人数限制" align="center" width="150" />
        <el-table-column label="奖励类型" align="center" width="150">
          <template slot-scope="{row}">
            {{ translateCurrentyType(row.reward_type) }}
          </template>
        </el-table-column>
        <el-table-column prop="reward_num" label="奖励数额" align="center" width="150" />
        <el-table-column prop="start_label" label="开始时间" align="center" width="150" />
        <el-table-column prop="end_label" label="结束时间" align="center" width="150" />
        <el-table-column :label="$t('common.operate')" align="center" width="200">
          <template slot-scope="{row}">
            <div class="operation_buttons">
              <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="visible" width="500px">
      <el-form label-width="120px">
        <el-form-item label="口令" required>
          <el-input v-model="form.command" type="text" />
          <span class="form-item_tip">注: 口令最长10个字符</span>
        </el-form-item>
        <el-form-item label="人数限制" required>
          <el-input v-model="form.player_num" type="number" />
        </el-form-item>
        <el-form-item label="奖励类型" required>
          <el-select v-model="form.reward_type">
            <el-option v-for="(item, key) in currencyTypeOptions()" :key="key" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="奖励数量" required>
          <el-input v-model="form.reward_num" type="number" />
        </el-form-item>
        <el-form-item label="开始时间" required>
          <el-date-picker v-model="form.start" type="date" />
        </el-form-item>
        <el-form-item label="结束时间" required>
          <el-date-picker v-model="form.end" type="date" />
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
import { currencyTypeOptions, translateCurrentyType } from '@/api/machine'
import { fetchData, update, create } from '@/api/word_command'
import ScIdPropMixin from '@/mixin/ScIdPropMixin'
import { filterRequestQuery } from '@/utils/query'

const Create = 1
const Edit = 2

export default {
  name: 'WordCommand',
  mixins: [ScIdPropMixin],
  data() {
    return {
      operate: Create, 
      visible: false,
      loading: false,
      list: [],
      form: {
        id: '',
        command: '',
        player_num: '',
        reward_type: '',
        reward_num: '',
        start: null,
        end: null
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.operate === Create ? '新建口令' : '编辑口令'
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
      this.form.start = new Date(row.start * 1000)
      this.form.end = new Date(row.end * 1000)
      this.form.player_num = row.player_num
      this.form.reward_type = row.reward_type
      this.form.reward_num = row.reward_num
      this.form.command = row.command
      this.visible = true
      this.operate = Edit
    },
    onDelete(day) {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = function(action, instance, done) {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          deleteSetting(day).then(() => {
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
        this.getData()
      })
    },
    submit() {
      this.loading = true
      if (this.operate === Create) {
        create(filterRequestQuery(this.form)).then(response => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(() => {
          this.loading = false
        })
      } else {
        update(filterRequestQuery(this.form)).then(response => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(this.$t('common.success'))
        }).catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    onSearch() {
      this.fetchData()
    },
    translateCurrentyType,
    currencyTypeOptions
  }
}
</script>

<style lang="scss">
</style>
