<template>
  <div :style="{height: height, width: width}" />
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/theme/macarons') // echarts theme

// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')

// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'LineChart',
  props: {
    height: {
      type: String,
      default: '400px'
    },
    width: {
      type: String,
      default: '100%'
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
      const expectedData = [100, 120, 161, 134, 105, 160, 165]
      const actualData = [120, 82, 91, 154, 162, 140, 145]
      this.chart.setOption({
        title: {
          text: '注册人数'
        },
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['注册人数', 'actual']
        },
        series: [
        {
          name: '注册人数', 
          itemStyle: {
            color: '#FF005A',
          },
          lineStyle: {
            color: '#FF005A',
            width: 2
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            color: '#3888fa',
          },
          lineStyle: {
            color: '#3888fa',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>

<style>

</style>
