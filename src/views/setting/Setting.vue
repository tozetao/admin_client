<template>
  <div class="setting">
    <el-tabs v-model="currentCategory" type="border-card" @tab-click="onChangeCategory">
      <el-tab-pane label="基础设置" name="base">
        <el-tabs v-model="baseTab" type="card" tab-position="left" @tab-click="onChangeTab">
          <el-tab-pane label="基础设置" name="baseSetting">
            <base-setting ref="baseSetting" />
          </el-tab-pane>
          <el-tab-pane label="兑换设置" name="exchangeSetting">
            <exchange-setting ref="exchangeSetting" />
          </el-tab-pane>
          <el-tab-pane label="分享奖励设置" name="shareBonusSetting">
            <share-bonus-setting ref="shareBonusSetting" />
          </el-tab-pane>
          <el-tab-pane label="游戏须知/说明" name="gameNotice">
            <game-notice ref="gameNotice" />
          </el-tab-pane>
          <el-tab-pane label="停服设置" name="gameStopSetting">
            <stop-service-setting ref="gameStopSetting" />
          </el-tab-pane>
          <el-tab-pane label="微信客服二维码" name="wechatCustomer">
            <wechat-customer ref="wechatCustomer" />
          </el-tab-pane>
          <el-tab-pane label="授权配置" name="wechatAuthorization">
            <wechat-authorization ref="wechatAuthorization" />
          </el-tab-pane>
          <el-tab-pane label="轮播广告" name="homeBanner">
            <home-banner ref="homeBanner" />
          </el-tab-pane>
          <el-tab-pane label="通告设置" name="note">
            <note ref="note" />
          </el-tab-pane>
          <el-tab-pane label="机台分类设置" name="category">
            <category ref="category" />
          </el-tab-pane>
          <el-tab-pane label="IP白名单" name="whiteList">
            <white-list ref="whiteList" />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="新闻与公告" name="newsAndNotice">
        <el-tabs v-model="newsNoticeTab" type="card" tab-position="left" @tab-click="onChangeTab">
          <el-tab-pane label="新闻设置" name="newsSetting">
            <news-setting ref="newsSetting" />
          </el-tab-pane>
          <el-tab-pane label="系统公告" name="notice">
            <notice ref="notice" />
          </el-tab-pane>
          <el-tab-pane label="开屏公告" name="startupBanner">
            <startup-banner ref="startupBanner" />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="活动设置" name="activity">
        <el-tabs v-model="activityTab" type="card" tab-position="left" @tab-click="onChangeTab">
          <el-tab-pane label="7天签到设置" name="sevenDaySetting">
            <seven-day-setting ref="sevenDaySetting" />
          </el-tab-pane>
          <el-tab-pane label="周排行奖励" name="weekRankingReward">
            <week-ranking-reward ref="weekRankingReward" />
          </el-tab-pane>
          <el-tab-pane label="月排行奖励" name="monthRankingReward">
            <month-ranking-reward ref="monthRankingReward" />
          </el-tab-pane>
          <el-tab-pane label="周任务设置" name="weekTask">
            <week-task ref="weekTask" />
          </el-tab-pane>
          <!-- <el-tab-pane label="周任务奖励设置" name="weekTaskReward">
            <week-task-reward ref="weekTaskReward" />
          </el-tab-pane> -->
          <el-tab-pane label="口令设置" name="wordCommand">
            <word-command ref="wordCommand" />
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ExchangeSetting from '@/views/setting/ExchangeSetting'
import StopServiceSetting from '@/views/setting/StopServiceSetting'
import ShareBonusSetting from '@/views/setting/ShareBonusSetting'
import SevenDaySetting from '@/views/setting/SevenDaySetting'
import WeekRankingReward from '@/views/setting/WeekRankingReward'
import MonthRankingReward from '@/views/setting/MonthRankingReward'
import WeekTask from '@/views/setting/WeekTask'
import WeekTaskReward from '@/views/setting/WeekTaskReward'
import Notice from '@/views/setting/Notice'
import StartupBanner from '@/views/setting/StartupBanner'
import NewsSetting from '@/views/setting/NewsSetting'
import WordCommand from '@/views/setting/WordCommand'
import BaseSetting from '@/views/setting/Base'
import GameNotice from '@/views/setting/GameNotice'
import WechatCustomer from '@/views/setting/WechatCustomer'
import WechatAuthorization from '@/views/setting/WechatAuthorization'
import HomeBanner from '@/views/setting/HomeBanner'
import Note from '@/views/setting/Note'
import Category from '@/views/setting/Category'
import WhiteList from '@/views/setting/WhiteListIP'

import CustomSelect from '@/components/CustomSelect'

export default {
  name: 'Setting',
  components: {
    GameNotice,
    BaseSetting,
    CustomSelect,
    ExchangeSetting,
    StopServiceSetting,
    ShareBonusSetting,
    SevenDaySetting,
    WeekRankingReward,
    MonthRankingReward,
    WeekTask,
    WeekTaskReward,
    Notice,
    StartupBanner,
    NewsSetting,
    WordCommand,
    WechatCustomer,
    WechatAuthorization,
    HomeBanner,
    Note,
    Category,
    WhiteList
  },
  data() {
    return {
      currentCategory: 'base',
      // 存储
      categoryTabs: {
        base: false,
        newsAndNotice: false,
        activity: false
      },
      // 每个分类下的默认tab
      baseTab: 'baseSetting',
      newsNoticeTab: 'newsSetting',
      activityTab: 'sevenDaySetting',
      tabs: {
        gameNotice: false,
        baseSetting: false,
        exchangeSetting: false,
        shareBonusSetting: false,
        gameStopSetting: false,
        sevenDaySetting: false,
        weekRankingReward: false,
        weekTask: false,
        weekTaskReward: false,
        notice: false,
        startupBanner: false,
        newsSetting: false,
        wordCommand: false,
        wechatCustomer: false,
        wechatAuthorization: false,
        homeBanner: false,
        note: false,
        category: false,
        whiteList: false
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.refreshComponent(this.baseTab)
    })
  },
  methods: {
    // 大分类change时的事件
    onChangeCategory() {
      if (!this.categoryTabs[this.currentCategory]) {
        this.categoryTabs[this.currentCategory] = true
        if (this.currentCategory === 'base') {
          this.refreshComponent('exchangeSetting')
        } else if (this.currentCategory === 'newsAndNotice') {
          this.refreshComponent('newsSetting')
        } else {
          this.refreshComponent('sevenDaySetting')
        }
      }
    },
    // 切换tab判断该tab组件是否需要重置data数据。
    onChangeTab(event) {
      this.refreshComponent(event.name)
    },
    refreshComponent(name) {
      if (!this.tabs[name]) {
        this.tabs[name] = true
        if (this.$refs[name]) {
          this.$refs[name].fetchData()
        }
      }
    }
  }
}
</script>

<style lang="scss">
.setting {
  .container {
    padding: 20px;
    border: 1px solid #ebebeb;
  }
}
</style>
