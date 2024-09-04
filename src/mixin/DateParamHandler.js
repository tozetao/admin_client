import { getStartAndEndDateOfMonth } from '@/utils/datetime'

export default {
  methods: {
    // 设置为本月
    setDefaultDate() {
      const { startDate, endDate } = getStartAndEndDateOfMonth(new Date())
      endDate.setMinutes(59)
      endDate.setSeconds(59)
      endDate.setHours(23)
      if (this.query.start === null && this.query.end === null) {
        this.query.start = startDate
        this.query.end = endDate
      }
    },
    // 处理URL中的日期参数
    handleDateParams() {
      const { start, end } = this.$route.query
      if (start && end) {
        this.query.start = new Date(Number(start))
        this.query.end = new Date(Number(end))
      }
    },
    // 设为最近7天
    setLastSevenDays() {
      const start = new Date()
      start.setMinutes(0)
      start.setSeconds(0)
      start.setHours(0)
      start.setDate(start.getDate() - 6)
      const end = new Date()
      end.setMinutes(59)
      end.setSeconds(59)
      end.setHours(23)

      this.query.start = start
      this.query.end = end
    }
  }
}
