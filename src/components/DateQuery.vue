<template>
  <div>
    <el-button icon="el-icon-arrow-left" @click="onLastClick" />
    <el-dropdown split-button @command="handleDateSearchCommand" @click="onDateQuery">
      <i class="el-icon-date" /> {{ dateQueryText }}
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="today">{{ $t('common.today') }}</el-dropdown-item>
        <el-dropdown-item command="week">{{ $t('common.week') }}</el-dropdown-item>
        <el-dropdown-item command="month">{{ $t('common.month') }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button icon="el-icon-arrow-right" @click="onNextClick" />
  </div>
</template>

<script>
import { getStartAndEndDateOfWeek, getStartAndEndDateOfMonth, parseTime } from '@/utils/datetime'
import { translate } from '@/utils/i18n'

// 需求改写：
// 切换日期的时候，结束日期需要加上1天的秒数。

// 需求：
// 1. 获取from、to俩个时间，仅用于计算时间。
// 2. onDateChange事件：日期发生改变时，通知父组件。由父组件去处理触发的事件。
export default {
  name: 'DateQuery',
  props: {
    from: {
      type: Date,
      default: () => {
        return new Date()
      }
    },
    to: {
      type: Date,
      default: () => {
        return new Date()
      }
    }
  },
  data() {
    return {
      dateQueryType: 'today'
    }
  },
  computed: {
    dateQueryText() {
      if (this.dateQueryType === 'today') {
        return translate('common.today')
      } else if (this.dateQueryType === 'week') {
        return translate('common.week')
      } else if (this.dateQueryType === 'month') {
        return translate('common.month')
      }
      return translate('common.today')
    }
  },
  methods: {
    // 组件内不允许改变props的属性值
    getFrom() {
      if (this.from === null) {
        return new Date()
      }
      return this.from
    },
    getTo() {
      if (this.to === null) {
        return new Date()
      }
      return this.to
    },
    handleDateSearchCommand(command) {
      this.dateQueryType = command
      this.onDateQuery()
    },
    onDateQuery() {
      if (this.dateQueryType === 'today') {
        this.today()
      } else if (this.dateQueryType === 'week') {
        this.thisWeek()
      } else {
        this.month()
      }
    },
    onLastClick() {
      if (this.dateQueryType === 'today') {
        this.lastDay()
      } else if (this.dateQueryType === 'week') {
        this.lastWeek()
      } else {
        this.lastMonth()
      }
    },
    onNextClick() {
      if (this.dateQueryType === 'today') {
        this.nextDay()
      } else if (this.dateQueryType === 'week') {
        this.nextWeek()
      } else {
        this.nextMonth()
      }
    },
    lastWeek() {
      const { startDate } = getStartAndEndDateOfWeek(this.getFrom())
      startDate.setDate(startDate.getDate() - 1)

      const result = getStartAndEndDateOfWeek(startDate)
      const d1 = result.startDate
      const d2 = result.endDate
      this.dateAlignment(d1, d2)
      this.emitDateChange(d1, d2)
    },
    thisWeek() {
      const { startDate, endDate } = getStartAndEndDateOfWeek(new Date())
      this.dateAlignment(startDate, endDate)
      this.emitDateChange(startDate, endDate)
    },
    dateAlignment(startDate, endDate) {
      startDate.setHours(0)
      startDate.setMinutes(0)
      startDate.setSeconds(0)
      endDate.setHours(23)
      endDate.setMinutes(59)
      endDate.setSeconds(59)
    },
    nextWeek() {
      const to = this.getTo()
      to.setDate(to.getDate() + 1)
      const { startDate, endDate } = getStartAndEndDateOfWeek(to)
      this.dateAlignment(startDate, endDate)
      this.emitDateChange(startDate, endDate)
    },
    lastDay() {
      const from = this.getFrom()
      from.setDate(from.getDate() - 1)
      const year = from.getFullYear()
      // const month = from.getMonth() + 1
      const month = from.getMonth()
      const day = from.getDate()
      // const date = new Date(year + '/' + month + '/' + day)
      const d1 = new Date(year, month, day, 0, 0, 0)
      const d2 = new Date(year, month, day, 23, 59, 59)
      this.emitDateChange(d1, d2)
    },
    today() {
      // parseTime(new Date, '{y}-{m}-{d} {h}:{i}')
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth()
      const day = today.getDate()
      const d1 = new Date(year, month, day, 0, 0, 0)
      const d2 = new Date(year, month, day, 23, 59, 59)
      this.emitDateChange(d1, d2)
    },
    nextDay() {
      const to = this.getTo()
      to.setDate(to.getDate() + 1)
      const year = to.getFullYear()
      // const month = to.getMonth() + 1
      const month = to.getMonth()
      const day = to.getDate()
      // const date = new Date(year + '/' + month + '/' + day)
      console.log(month)
      const d1 = new Date(year, month, day, 0, 0, 0)
      const d2 = new Date(year, month, day, 23, 59, 59)
      this.emitDateChange(d1, d2)
    },
    lastMonth() {
      const from = this.getFrom()
      from.setDate(from.getDate() * -1)
      const { startDate, endDate } = getStartAndEndDateOfMonth(from)
      this.dateAlignment(startDate, endDate)
      this.emitDateChange(startDate, endDate)
    },
    month() {
      const { startDate, endDate } = getStartAndEndDateOfMonth(this.getFrom())
      this.dateAlignment(startDate, endDate)
      this.emitDateChange(startDate, endDate)
    },
    nextMonth() {
      const to = this.getTo()
      let date
      const nextMonth = to.getMonth() + 2
      if (nextMonth === 13) {
        const year = to.getFullYear() + 1
        date = new Date(year + '/1/1')
      } else {
        date = new Date(to.getFullYear() + '/' + nextMonth + '/1')
      }
      const { startDate, endDate } = getStartAndEndDateOfMonth(date)
      this.dateAlignment(startDate, endDate)
      this.emitDateChange(startDate, endDate)
    },
    emitDateChange(from, to) {
      this.$emit('date-change', {
        from,
        to,
        fromString: parseTime(from),
        toString: parseTime(to)
      })
    }
  }
}
</script>

<style>

</style>
