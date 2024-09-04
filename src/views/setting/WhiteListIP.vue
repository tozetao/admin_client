<template>
  <div>
    <div class="form-container">
      <el-form label-width="140px" size="small">
        <el-form-item label="IP地址">
          <el-input v-model="val" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fetchData, update } from '@/api/white_list_ip'

export default {
  name: 'WhiteListIP',
  data() {
    return {
      val: ''
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        console.log('white list ip: %o', data)
        this.val = data.val
      })
    },
    onSave() {
      update({
        val: this.val
      }).then(() => {
        this.$message.success('操作成功!')
      })
    }
  }
}
</script>

<style>

</style>