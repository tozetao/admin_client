<template>
  <div :style="{height: height, width: width}" />
</template>

<script>
var echarts = require('echarts/lib/echarts')
// echarts theme
require('echarts/theme/macarons')

// 引入折线图
require('echarts/lib/chart/line')

// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'SmoothedLineChart',
  props: {
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    },
    title: {
      type: String,
      default: ''
    },
    xAxisData: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el)
      this.setOptions()
    },
    setOptions() {
      // ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      // [820, 932, 901, 934, 1290, 1330, 1320]
      this.chart.setOption({
        title: {
          text: this.title
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.data,
            type: 'line',
            smooth: true
          }
        ]
      })
    }
  }
}
</script>

<style>

</style>