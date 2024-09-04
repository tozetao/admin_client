<template>
  <el-tabs v-model="activeTab" type="border-card">
    <el-tab-pane :label="$t('common.home')" name="default">
      <div class="inline-filter">
        <div v-if="belongsToCentralServer" class="item">
          <div class="item__content">
            <custom-select v-model="query.sc_id" data-type="servers" filterable @change="onSelectServer" />
          </div>
        </div>
        <div class="item">
          <div class="item__content">
            <el-date-picker v-model="query.start" type="date" :placeholder="$t('common.start_time')" />
            <span class="range-separator">-</span>
            <el-date-picker v-model="query.end" type="date" :placeholder="$t('common.end_time')" />
          </div>
        </div>
        <div class="item">
          <div class="item__content">
            <date-query ref="dateQuery" :from="query.start" :to="query.end" class="button" @date-change="onDateChange" />
          </div>
        </div>
        <div class="item">
          <div class="item__content">
            <el-button type="primary" @click="fetchData">{{ $t('common.search') }}</el-button>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from 'vuex'
import { filterRequestQuery } from '@/utils/query'

import { dashboardData } from '@/api/dashboard'

import CustomSelect from '@/components/CustomSelect'
import Descriptions from '@/components/Descriptions/Index'
import DescriptionsItem from '@/components/Descriptions/Item'
import DateQuery from '@/components/DateQuery'

import DateParamHandler from '@/mixin/DateParamHandler'

export default {
  name: 'Dashboard',
  components: {
    CustomSelect,
    Descriptions,
    DescriptionsItem,
    DateQuery
  },
  mixins: [DateParamHandler],
  data() {
    const scId = this.$store.getters.user.defaultScId
    return {
      query: {
        sc_id: scId,
        start: null,
        end: null
      },
      loading: false,
      activeTab: 'default'
    }
  },
  computed: {
    ...mapGetters(['belongsToCentralServer', 'isPromoter', 'user'])
  },
  created() {
    this.$nextTick(() => {
      this.setLastSevenDays()
      this.fetchData()
    })
  },
  methods: {
    onDateChange({ from, to }) {
      this.query.start = from
      this.query.end = to
      this.fetchData()
    },
    fetchData() {
      this.loading = true
      dashboardData(filterRequestQuery(this.query)).then(response => {
        this.loading = false
        const { data } = response
        console.log(data)
      }).catch(() => {
        this.loading = false
      })
    },
    onSelectServer() {
      if (this.query.sc_id) {
        this.$store.dispatch('user/setActiveServerId', this.query.sc_id).then(() => {
          location.reload()
        })
      }
    }
  }
}
</script>

<style lang="scss">
.welcome {
  font-size: 30px;
  font-weight: 600;
}

.home {
  .stat-table {
    max-width: 992px;
    margin-top: 10px;
  }

  .stats {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;

    &-head {
      padding: 12px 10px;
      border-bottom: 1px solid #ebebeb;
      font-size: 20px;
      font-weight: 400;
      color: #1f2f3d;
    }

    &-body {
      padding: 20px;
    }

    &-block {
      margin: 0;
      padding: 10px 0;

      width: 100%;
      height: 70px;
      box-sizing: border-box;
      border-radius: 4px;
      transition: opacity .2s;

      color: #000;
      font-variant: tabular-nums;
      font-feature-settings: "tnum";

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      &__title {
        margin-bottom: 4px;
        color: #606266;
        font-size: 13px;
      }

      &__con {
        font-family: Sans-serif;
        color: #303133;
        font-size: 18px;
        padding: 0 4px;
      }
    }
  }

  .success {
    background-color: #f0f9eb;
    border: 1px solid #f0f9eb;
  }
  .info {
    background-color: #f4f4f5;
  }
  .warning {
    background-color: #fdf6ec;
  }
  .error {
    background-color: #fef0f0;
  }
}
</style>