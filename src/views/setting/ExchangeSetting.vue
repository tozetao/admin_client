<template>
  <div class="exchange-setting">
    <div class="form-container">
      <p class="title">兑入</p>
      <el-form label-width="150px" size="small">
        <!-- 原第三方货币兑换比例 -->
        <el-form-item label="系统币兑5G币" required>
          <div class="exchange_item">
            <el-input v-model="form.thirdPartyExchange" type="text" />
            <el-checkbox v-model="exchangeType.system_coin_to_5g_coin">勾选</el-checkbox>
          </div>
        </el-form-item>
        <!-- 系统金币兑乐享币 -->
        <el-form-item label="系统币兑5G乐享币" required>
          <div class="exchange_item">
            <el-input v-model="form.systemCoinToShareCoin" type="text" />
            <el-checkbox v-model="exchangeType.system_coin_to_share_coin">勾选</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleCashInSetting">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="form-container">
      <p class="title">兑出</p>
      <el-form label-width="150px" size="small">
        <!-- 系统票兑5G票 -->
        <el-form-item label="系统票兑5G票" required>
          <div class="exchange_item">
            <el-input v-model="form.systemTicketTo5GTicket" type="text" />
            <el-checkbox v-model="exchangeType.system_ticket_to_5g_ticket">勾选</el-checkbox>
          </div>
        </el-form-item>
        <!-- 系统票兑5G乐享票 -->
        <el-form-item label="系统票兑5G乐享票" required>
          <div class="exchange_item">
            <el-input v-model="form.systemTicketToShareTicket" type="text" />
            <el-checkbox v-model="exchangeType.system_ticket_to_share_ticket">勾选</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item label="系统积分兑5G票" required>
          <el-input v-model="form.systemTicketToPoint" type="text" />
        </el-form-item>
        <el-form-item label="系统币兑5G票" required>
          <div class="exchange_item">
            <el-input v-model="form.systemTicketToSystemCoin" type="text" />
            <el-checkbox v-model="exchangeType.system_ticket_to_system_coin">勾选</el-checkbox>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleRedeemSetting">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="form-container">
      <el-form label-width="150px" size="small">
        <el-form-item label="乐享币和票开关">
          <el-switch v-model="form.shareCurrencyStatus" :active-value="1" :inactive-value="0" @change="onChange" /><p class="form-item_tip">Tip: 打开后4种货币</p>  
        </el-form-item>
        <el-form-item label="玩家兑换上限">
          <el-input v-model="form.upperLimit" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleOther">保存</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- <div style="padding-left: 150px; padding-top: 20px;">
      <el-button type="primary" :loading="loading" @click="onSubmit()">{{ $t('common.save') }}</el-button>
    </div> -->
    
  </div>
</template>

<script>
import { fetchData, update } from '@/api/exchange_setting'

const CashIn = 1
const Redeem = 2
const Other = 3

export default {
  name: 'ExchangeSetting',
  data() {
    return {
      loading: false,

      form: {
        toggle: 1,
        shareCurrencyStatus: 0,
        upperLimit: '',

        systemTicketTo5GTicket: '',
        systemCoinToShareCoin: '',
        systemTicketToShareTicket: '',
        systemTicketToSystemCoin: '',
        // 第三方货币比例
        thirdPartyExchange: '',
        // 系统票兑换积分
        systemTicketToPoint: ''
      },
      exchangeType: {
        system_coin_to_5g_coin: false,
        system_coin_to_share_coin: false,
        system_ticket_to_share_ticket: false,
        system_ticket_to_system_coin: false,
        system_ticket_to_5g_ticket: false
      }
    }
  },
  methods: {
    fetchData() {
      fetchData().then(response => {
        const { data } = response
        this.exchangeType = data.exchange_type
        this.form.shareCurrencyStatus = data.share_currency_status
        this.form.thirdPartyExchange = data.third_party_exchange
        this.form.systemTicketTo5GTicket = data.system_ticket_to_5g_ticket
        this.form.systemTicketToShareTicket = data.system_ticket_to_share_ticket
        this.form.systemCoinToShareCoin = data.system_coin_to_share_coin
        this.form.systemTicketToPoint = data.system_ticket_to_point
        this.form.systemTicketToSystemCoin = data.system_ticket_to_system_coin

        this.form.upperLimit = data.exchange_upper_limit
      })
    },
    onSubmit() {
      this.loading = true
      update({
        exchange_type: this.exchangeType,
        system_ticket_to_5g_ticket: this.form.systemTicketTo5GTicket,
        system_ticket_to_share_ticket: this.form.systemTicketToShareTicket,
        system_coin_to_share_coin: this.form.systemCoinToShareCoin,
        third_party_exchange: this.form.thirdPartyExchange,
        system_ticket_to_point: this.form.systemTicketToPoint,
        system_ticket_to_system_coin: this.form.systemTicketToSystemCoin
      }).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    },
    onChange() {
      update({
        share_currency_status: this.form.shareCurrencyStatus,
        operation: Other
      }).then(() => {
        this.$message.success(this.$t('common.success'))
      }).catch(err => {
        console.log(err)
      })
    },
    handleCashInSetting() {
      this.loading = true

      update({
        operation: CashIn,
        exchange_type: this.exchangeType,
        system_coin_to_share_coin: this.form.systemCoinToShareCoin,
        third_party_exchange: this.form.thirdPartyExchange
      }).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    },
    handleRedeemSetting() {
      this.loading = true

      update({
        operation: Redeem,
        exchange_type: this.exchangeType,

        system_ticket_to_5g_ticket: this.form.systemTicketTo5GTicket,
        system_ticket_to_share_ticket: this.form.systemTicketToShareTicket,
        system_ticket_to_point: this.form.systemTicketToPoint,
        system_ticket_to_system_coin: this.form.systemTicketToSystemCoin
      }).then(() => {
        this.loading = false
        this.$message.success(this.$t('common.success'))
      }).catch(() => {
        this.loading = false
      })
    },
    handleOther() {
      update({
        upper_limit: this.form.upperLimit,
        operation: Other
      }).then(() => {
        this.$message.success(this.$t('common.success'))
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
.exchange-setting {
  .bordered-block {
    border: 1px solid #e0e0e0;
  }

  .form-container {
    margin-top: 26px;
    position: relative;
  }
  .form-container:first-child {
    margin-top: 6px;
  }

  .title {
    position: absolute;
    left: 18px;
    top: -8px;
    color: #606266;
    font-size: 14px;
    background-color: #fff;
    padding: 0;
    margin: 0;
  }

  .exchange_item {
    display: flex;
    .el-checkbox {
      margin-left: 6px;
    }
  }
}
</style>