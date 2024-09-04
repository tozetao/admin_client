<template>
  <div class="admin-form">
    <!-- <div class="block-header">
      <div class="block-header__h3">{{ $t('admin.edit_title') }}</div>
      <el-button type="primary" size="small" @click="visible = true">{{ $t('common.reset_password') }}</el-button>
    </div> -->

    <div class="form-container">
      <el-form ref="form" :model="adminForm" label-width="120px" size="small">
        <el-form-item :label="$t('common.account')" prop="account" required>
          <el-input v-model="adminForm.account" type="text" disabled />
        </el-form-item>

        <el-form-item :label="$t('common.permissions')" required>
          <el-checkbox-group v-model="adminForm.permissions">
            <el-checkbox v-for="(item, key) in permissionOptions" :key="key" :label="item.key" name="type">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSave()">{{ $t('common.save') }}</el-button>
          <el-button @click="goBack()">{{ $t('common.go_back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :title="$t('common.reset_password')" :visible.sync="visible" width="400px">
      <el-input v-model="adminForm.password" type="password" placeholder="Please input the password" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" :loading="loading" @click="onResetPassword">{{ $t('common.save') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchAdmin, updateAdmin, fetchPermissions } from '@/api/admin'

export default {
  data() {
    return {
      adminForm: {
        id: 0,
        account: '',
        password: '',
        permissions: []
      },
      permissionOptions: [],
      visible: false,
      loading: false
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchAdmin(to.params.id)
    next()
  },
  created() {
    this.$nextTick(function() {
      // this.permissionOptions = this.$store.state.user.permissionOptions
      this.fetchPermissions()
      this.fetchAdmin(this.$route.params.id)
    })
  },
  methods: {
    fetchAdmin(id) {
      fetchAdmin(id).then(response => {
        const { data } = response
        const { id, account, permissions } = data
        this.adminForm.id = id
        this.adminForm.account = account
        this.adminForm.permissions = permissions
      })
    },
    fetchPermissions() {
      fetchPermissions().then(response => {
        const { data } = response
        this.permissionOptions = data
      })
    },
    onSave() {
      this.loading = true
      updateAdmin(this.adminForm.id, this.adminForm).then(() => {
        this.loading = false
        this.visible = false
        this.$message.success(this.$t('common.update_successful'))
        this.goBack()
      }).catch(() => {
        this.loading = false
        this.visible = false
      })
    },
    onResetPassword() {
      this.onSave()
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">
</style>>
