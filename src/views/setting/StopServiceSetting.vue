<template>
  <div>
    <div class="form-container">
      <el-form label-width="120px" size="small">
        <el-form-item label="停服设置" required>
          <el-select v-model="form.status">
            <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <div v-if="showAutoColumns">
          <el-form-item label="自动开服时间" required>
            <el-select v-model="form.start">
              <el-option v-for="(item, index) in timesOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="自动关服时间" required>
            <el-select v-model="form.end">
              <el-option v-for="(item, index) in timesOptions" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </div>

        <div v-if="showStopContent">
          <el-form-item label="停服标题">
            <el-input type="text" v-model="form.title" />
          </el-form-item>
          <el-form-item label="停服公告">
            <el-input type="textarea" :rows="5" v-model="form.content" />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/stop_service_setting'

const Normal = 1
const Stoped = 0
const Auto = 2

export default {
  name: 'StopServiceSetting',
  data() {
    const timesOptions = []
    for (let i = 0; i < 24; i++) {
      timesOptions.push({ label: i + '点', value: i })
    }
    return {
      loading: false,
      timesOptions,
      typeOptions: [
        { label: '正常', value: Normal },
        { label: '维护', value: Stoped },
        { label: '自动', value: Auto }
      ],
      form: {
        status: 1,
        start: 0,
        end: 0,
        title: '',
        content: '',
        auto_title: '',
        auto_content: ''
      }
    }
  },
  computed: {
    showAutoColumns() {
      return this.form.status === Auto
    },
    showStopContent() {
      console.log(this.form.status)
      return this.form.status !== Normal
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.form.status = data.status
        this.form.start = data.start
        this.form.end = data.end
        this.form.title = data.title
        this.form.content = data.content
      })
    },
    onSubmit() {
      this.loading = true
      update(this.form).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>