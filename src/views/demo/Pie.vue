<template>
  <div :style="{height: height, width: width}" />
</template>

<script>
// 显示每种机台的数据占比
var echarts = require('echarts/lib/echarts')
require('echarts/theme/macarons') // echarts theme

// 引入柱状图
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')

// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'Pie',
  props: {
    height: {
      type: String,
      default: '500px'
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
      const option = {
        title: {
          text: 'Referer of a Website',
          subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads(59%)' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.chart.setOption(option)
    }
  }
}
</script>

<style>

</style>
