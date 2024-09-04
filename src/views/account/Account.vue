<template>
  <div>
    <div class="block-header">
      <div class="block-header__h4">{{ $t('common.account_info') }}</div>
      <el-button type="primary" @click="show">{{ $t('common.change_pwd') }}</el-button>
    </div>

    <div class="form-container">
      <el-form ref="form" label-width="150px">
        <el-form-item :label="$t('common.account')">
          <el-input v-model="user.account" name="account" :disabled="true" />
        </el-form-item>

        <el-form-item :label="$t('common.created_at')">
          <el-input v-model="createdAt" type="text" :disabled="true" />
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :title="$t('common.change_pwd')" :visible.sync="visible" :close-on-click-modal="false" width="600px">
      <el-form label-width="120px">
        <el-form-item :label="$t('common.old_pwd')">
          <el-input v-model="oldPassword" type="password" />
        </el-form-item>
        <el-form-item :label="$t('common.new_pwd')">
          <el-input v-model="newPassword" type="password" />
        </el-form-item>
        <el-form-item :label="$t('common.confirm_new_pwd')">
          <el-input v-model="confirmPassword" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button @click="visible = false">{{ $t('common.cancel') }}</el-button>
          <el-button type="primary" :loading="loading" @click="submit">{{ $t('common.save') }}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { changePassword } from '@/api/session'
import { mapGetters } from 'vuex'
import { parseTime } from '@/filter'
export default {
  name: 'Account',
  data() {
    return {
      value: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      visible: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    createdAt() {
      return this.user ? parseTime(this.user.createdAt) : '-'
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    submit() {
      if (this.newPassword !== this.confirmPassword) {
        this.$message.warning(this.$t('common.confirm_pwd_warn'))
        return false
      }
      this.loading = true
      changePassword({
        new_password: this.newPassword,
        old_password: this.oldPassword,
        confirm_new_password: this.confirmPassword
      }).then(response => {
        this.$message.success(response.message)
        this.loading = false
        this.logout()
      }).catch(err => {
        console.log(err)
        this.loading = false
      })
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)

      this.$store.dispatch('polling/stop')
      await this.$store.dispatch('user/logout')
      let url = `/login?redirect=${this.$route.fullPath}`;
      const code = window.localStorage.getItem('login_code')
      if (code) {
        url += '&code=' + code
      }
      this.$router.push(url)
    },
    onCopy() {
      this.$message('')
    },
    onError() {
      console.log('copy error.')
    }
  }
}
</script>

<style lang="scss">
</style>
