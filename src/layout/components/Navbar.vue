<template>
  <div id="navbar" class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="right-menu-label">{{ serverName }}</span>
      <span class="separator">|</span>
      <el-dropdown @command="onChangeLocale">
        <span class="el-dropdown-link">
          EN<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="locale in locales" :key="locale.command" :command="locale.command">{{ locale.label }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span class="separator">|</span>
      <span class="right-menu-label">Welcome, <a class="cheng" @click="toAccount">{{ account }}({{ roleName }})</a></span>
      <span class="separator">|</span>
      <a class="right-menu-label" @click="onLogout"><span class="logout">Exit</span></a>
    </div>

    <el-dialog title="Message" :visible.sync="logoutDialogVisible">
      <span>Logging out closes the sessions. Do you want to contine?</span>
      <div slot="footer" class="dialog-footer">
        <div>
          <el-button type="primary" :loading="loading" @click="onLogout">OK</el-button>
          <el-button type="primary" @click="logoutDialogVisible=false">Cancel</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import { Admin, Promoter, zh_CN, en, translateLocale, updateSession, Distributor } from '@/api/session'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      timezone: 'BEIJING',
      localeType: en,

      logoutDialogVisible: false,
      loading: false,
      password: '',
      failureLeftSpacing: '0px'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'config', 'user']),
    currentLocale() {
      if (this.localeType) {
        return translateLocale(this.localeType)
      }
      return 'unknown'
    },
    account() {
      return this.user ? this.user.account : ''
    },
    serverName() {
      return this.user ? this.user.activeServerName : ''
    },
    roleName() {
      if (!this.user) {
        return ''
      }
      switch (this.user.type) {
        case Admin:
          return this.$t('common.admin')
        case Promoter:
          return this.$t('common.promoter')
        case Distributor:
          return this.$t('common.distributor')
      }
      return ''
    },
    showFailures() {
      return this.$store.state.polling.machineFailures
    },
    locales() {
      return [
        { command: zh_CN, label: translateLocale(zh_CN) },
        { command: en, label: translateLocale(en) }
      ]
    }
  },
  created() {
    this.$nextTick(() => {
      if (this.user.timezone) {
        this.timezone = this.user.timezone
      }
      if (this.user.locale) {
        this.localeType = this.user.locale
        this.$i18n.locale = this.user.locale
      } else {
        this.$i18n.locale = this.localeType
      }
      this.calcFailreLeftSpacing()
      window.onresize = this.calcFailreLeftSpacing
    })
  },
  methods: {
    calcFailreLeftSpacing() {
      const spacing = (document.getElementById('navbar').clientWidth - 400 - 338 - 50 - 225) / 2
      if (spacing < 0) {
        this.failureLeftSpacing = '0px'
      } else {
        this.failureLeftSpacing = spacing + 'px'
      }
    },
    // 切换侧边栏
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    onLock() {
      this.$store.dispatch('user/lock')
    },
    onUnlock() {
      this.loading = true
      const promise = this.$store.dispatch('user/unlock', this.password)
      promise.then(() => {
        this.password = ''
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    onLogout() {
      this.logout()
    },
    toAccount() {
      this.$router.push({
        name: 'Account'
      })
    },
    async logout() {
      this.$store.dispatch('polling/stop')
      await this.$store.dispatch('user/logout')
      let url = `/login?redirect=${this.$route.fullPath}`
      const code = window.localStorage.getItem('login_code')
      if (code) {
        url += '&code=' + code
      }
      this.$router.push(url)
    },
    async changeLocale() {
      updateSession({
        locale: this.localeType
      }).then(response => {
        console.log(response)
      })
    },
    async changeTimezone() {
      updateSession({
        timezone: this.timezone
      }).then(response => {
        console.log(response)
      })
    },
    onChangeLocale(command) {
      this.localeType = command
      this.$i18n.locale = command
      this.changeLocale()
    },
    onChangeTimezone(command) {
      this.timezone = command
      this.changeTimezone()
    },
    onClickFailures() {
      this.$router.push({
        name: 'MachineFailure'
      })
    },
    onChangeLocale(command) {
      console.log(command)
    }
  }
}
</script>

<style lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  // box-shadow: 0 1px 4px rgba(0,21,41,.08);
  // box-shadow: 3px 3px 3px #bebdbd7d;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  // 右边菜单样式
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    padding-right: 15px;
    &:focus {
      outline: none;
    }

    .cheng {
      color: #E6A23C;
    }
    .logout {
      color: #F56C6C;
    }

    .right-menu-label, .separator {
      display: inline-block;
      height: 100%;
      font-size: 14px;
      color: #303133;
    }

    .separator {
      padding: 0 5px;
      color: #97a8be;
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
  }

  .lock-dialog {
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      height: 100%;
      border: 1px solid #cdc;
      padding: 0;
    }
  }

  .failure {
    float: left;
    width: 400px;
    height: 100%;

    background-color: #ffeded;
    color: #ff4949;
    text-align: center;
    font-size: 14px;
    line-height: 50px;

    a {
      margin-left: 20px;
      color: #a1a5ac
    }
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
