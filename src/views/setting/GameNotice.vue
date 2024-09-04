<template>
  <div>
    
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="机台须知" name="game_notices">
          <div class="form-container">
            <el-form label-width="120px" size="small">
              <el-form-item label="娃娃机须知">
                <el-input v-model="gameNoticeForm.claw_machine" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item label="推币机须知">
                <el-input v-model="gameNoticeForm.coin_pusher" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item label="街机须知">
                <el-input v-model="gameNoticeForm.arcade" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="机台说明" name="machine_descriptions">
          <div class="form-container">
            <el-form label-width="120px" size="small">
              <el-form-item label="娃娃机说明">
                <el-input v-model="descriptionForm.claw_machine" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item label="推币机说明">
                <el-input v-model="descriptionForm.coin_pusher" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item label="街机说明">
                <el-input v-model="descriptionForm.arcade" type="textarea" :rows="6" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    
  </div>
</template>

<script>
import { fetchData, update } from '@/api/game_notice'

export default {
  name: 'GameNotice',
  data() {
    return {
      activeName: 'game_notices',
      gameNoticeForm: {
        claw_machine: '',
        coin_pusher: '',
        arcade: ''
      },
      descriptionForm: {
        claw_machine: '',
        coin_pusher: '',
        arcade: ''
      },
      loading: false
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.gameNoticeForm.claw_machine = data.game_notices.claw_machine
        this.gameNoticeForm.coin_pusher = data.game_notices.coin_pusher
        this.gameNoticeForm.arcade = data.game_notices.arcade

        this.descriptionForm.claw_machine = data.machine_descriptions.claw_machine
        this.descriptionForm.coin_pusher = data.machine_descriptions.coin_pusher
        this.descriptionForm.arcade = data.machine_descriptions.arcade
      })
    },
    replaceLineBreaks(content) {
      if (content) {
        content = content.toString()
        let r = content.replaceAll('\n', '<br/>')
        return r
      }
      return content
    },
    onSubmit() {
      this.loading = true
      update({
        game_notices: this.gameNoticeForm,
        machine_descriptions: this.descriptionForm
      }).then(() => {
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