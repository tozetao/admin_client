<template>
  <div>
    <div style="width: 652px;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <el-button v-if="isCentralAdmin" type="primary" :loading="btnLoading" @click="initConfig">生成模板数据</el-button>
        <el-checkbox v-model="status" label="启用/禁用" @change="onChangeStatus" />
      </div>
      <el-table :data="list" border class="m-t-s">
        <el-table-column prop="day" :label="$t('seven_day_setting.days')" align="center" width="150" />
        <el-table-column prop="type" :label="$t('common.type')" align="center" width="150">
          <template slot-scope="{row}">
            {{ translateCurrentyType(row.type) }}
          </template>
        </el-table-column>
        <el-table-column prop="num" :label="$t('common.reward_amount')" align="center" width="150" />
        <el-table-column :label="$t('common.operate')" align="center" width="200">
          <template slot-scope="{row}">
            <div class="operation_buttons">
              <el-link type="primary" @click="onEdit(row)">{{ $t('common.edit') }}</el-link>
              <!-- <el-link type="info" @click="onDelete(row.day)">{{ $t('common.delete') }}</el-link> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="编辑设置" :visible.sync="visible" width="500px">
      <el-form label-width="120px">
        <el-form-item v-if="showDayColumn" :label="$t('seven_day_setting.days')">
          <el-input v-model="form.day" type="number" disabled />
        </el-form-item>
        <el-form-item :label="$t('common.type')">
          <el-select v-model="form.type">
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
    </el-dialog>
  </div>
</template>

<script>
import { currencyTypeOptions, translateCurrentyType } from '@/api/machine'
import { fetchData, update, create, initConfig, changeStatus } from '@/api/seven_day_setting'
import { mapGetters } from 'vuex'

const Create = 1
const Edit = 2

export default {
  name: 'SevenDaySetting',
  data() {
    return {
      btnLoading: false,

      operate: Create, 
      visible: false,
      loading: false,
      list: [],
      form: {
        day: '',
        type: '',
        num: ''
      },
      status: false
    }
  },
  computed: {
    ...mapGetters(['isCentralAdmin']),
    showDayColumn() {
      return this.operate === Edit
    }
  },
  methods: {
    initConfig() {
      this.btnLoading = true
      initConfig().then(() => {
        this.$message.success(this.$t('common.success'))
        this.btnLoading = false
      }).catch(() => {
        this.btnLoading = false
      })
    },
    fetchData(query) {
      fetchData(query).then(response => {
        const { data } = response
        this.list = data.list
        this.status = !!data.status
      })
    },
    create() {
      this.visible = true
      this.operate = Create
    },
    onEdit(row) {
      this.form.day = row.day
      this.form.type = row.type
      this.form.num = row.num
      this.visible = true
      this.operate = Edit
    },
    onDelete(day) {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = (action, instance, done) => {
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
        create(this.form).then(response => {
          this.fetchData()
          this.loading = false
          this.visible = false
          this.$message.success(response.message)
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
          this.visible = false
        })
      }
    },
    onChangeStatus() {
      const confirmButtonText = this.$t('common.enter')
      const cancelButtonText = this.$t('common.cancel')
      const beforeClose = (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = 'Loading...'
          console.log('status: %o', this.status)
          changeStatus({
            status: this.status
          }).then(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirmButtonText
            done()
            this.$message.success(this.$t('common.success'))
          }).catch(() => {
            instance.confirmButtonLoading = false
            instance.confirmButtonText = confirmButtonText
            done()
            
            this.status = !this.status
          })
        } else {
          done()
        }
      }
      this.$confirm('确定改签签到状态?', this.$t('common.tips'), {
        confirmButtonText,
        cancelButtonText,
        type: 'warning',
        center: true,
        beforeClose
      }).then(() => {
        console.log('success')
      }).catch(() => {
        console.log('error')
        this.status = !this.status
      })
    },
    demo() {
      this.status = !this.status
    },
    translateCurrentyType,
    currencyTypeOptions
  }
}
</script>

<style lang="scss">
</style>
