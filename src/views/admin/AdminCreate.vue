<template>
  <div class="admin-form">
    <!-- <div class="block-header">
      <div class="block-header__h3">{{ $t('admin.create_title') }}</div>
    </div> -->
    <div class="form-container">
      <el-form ref="adminForm" :model="adminForm" label-width="100px" size="small">
        <el-form-item :label="$t('common.account')" prop="account" required :error="errors.account">
          <el-input v-model="adminForm.account" type="text" />
        </el-form-item>

        <el-form-item :label="$t('common.password')" prop="password" required :error="errors.password">
          <el-input v-model="adminForm.password" type="password" show-password />
        </el-form-item>

        <el-form-item :label="$t('common.permissions')">
          <el-checkbox-group v-model="adminForm.permissions">
            <el-checkbox v-for="(item, key) in permissionOptions" :key="key" :label="item.key" name="type">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.create') }}</el-button>
          <el-button @click="goBack()">{{ $t('common.go_back') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { createAdmin, fetchPermissions } from '@/api/admin'

export default {
  name: 'AdminCreate',
  data() {
    return {
      adminForm: {
        account: '',
        password: '',
        permissions: []
      },
      permissionOptions: [],
      loading: false,
      errors: {
        account: '',
        password: ''
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.fetchPermissions()
    })
  },
  methods: {
    initErrors() {
      this.errors = {
        account: '',
        password: ''
      }
    },
    fetchPermissions() {
      fetchPermissions().then(response => {
        const { data } = response
        this.permissionOptions = data
      })
    },
    onSubmit() {
      this.loading = true
      this.initErrors()
      createAdmin(this.adminForm).then(response => {
        this.loading = false
        this.$message.success(this.$t('common.created_successful'))
        this.goBack()
      }).catch(err => {
        console.log(err)
        const { code, errors } = err
        if (this.errCode.ParamError === code) {
          this.errors = errors
        }
        this.loading = false
        console.log(this.loading)
      })
    },
    goBack() {
      this.$router.push({
        name: 'Admin'
      })
      // const view = this.$route
      // this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      //   console.log(visitedViews)
      //   // if (this.isActive(view)) {
      //   //   this.toLastView(visitedViews, view)
      //   // }
      // })
    }
  }
}
</script>

<style lang="scss">

</style>
