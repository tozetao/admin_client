<template>
  <div>
    <div id="stacked_line_chat" :style="{height: height, width: width, margin: '1px auto'}" />
  </div>
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
    },
    title: {
      type: String,
      default: ''
    },
    xAxisData: {
      type: Array,
      required: true
    },
    // series中的元素是由属性color, name, data组成的对象。
    series: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chart: null,
      innerSeries: this.series,
      innerXAxisData: this.xAxisData
    }
  },
  watch: {
    xAxisData(newValue) {
      this.innerXAxisData = newValue
    },
    series(newValue) {
      this.innerSeries = newValue
      this.setOptions()
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(document.getElementById('stacked_line_chat'))
      this.setOptions()
    },
    setOptions() {
      const series = this.buildSeries()
      const legendData = this.buildLegendData()
      this.chart.setOption({
        title: {
          text: this.title
        },
        xAxis: {
          data: this.innerXAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 50,
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
          data: legendData
        },
        series
      })
    },
    buildLegendData() {
      const data = []
      this.innerSeries.forEach(element => {
        data.push(element.name)
      })
      return data
    },
    buildSeries() {
      const data = []
      this.innerSeries.forEach(element => {
        data.push({
          name: element.name,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: element.color
          },
          lineStyle: {
            color: element.color,
            width: 2
          },
          data: element.data,
          animationDuration: 2800
        })
      })
      return data
    }
  }
}
</script>

<style>

</style>
