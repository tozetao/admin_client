<template>
  <div :style="{height: height, width: width}" />
</template>

<script>
var echarts = require('echarts/lib/echarts')
require('echarts/theme/macarons') // echarts theme

// 引入柱状图
require('echarts/lib/chart/bar')

// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

export default {
  name: 'Bar',
  props: {
    height: {
      type: String,
      default: '80vh'
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
      const labelOption = {
        show: false,
        position: 'insideBottom',
        distance: 15,
        align: 'left',
        verticalAlign: 'middle',
        rotate: 90,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {}
        }
      };
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['收益', '总投入', '总退币', 'Wetland']
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: { show: false },
            data: ['2012', '2013', '2014', '2015', '2016', '2090', '3030']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '收益',
            type: 'bar',
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [2860, 36, 24, 31, 390, 3900, 876]
          },
          {
            name: '总投入',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [7900, 1018, 191, 340, 290, 8900, 500]
          },
          {
            name: '总退币',
            type: 'bar',
            label: labelOption,
            emphasis: {
              focus: 'series'
            },
            data: [5040, 978, 201, 304, 190, 5000, 900]
          }
          // {
          //   name: 'Wetland',
          //   type: 'bar',
          //   label: labelOption,
          //   emphasis: {
          //     focus: 'series'
          //   },
          //   data: [98, 77, 101, 99, 40]
          // }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style>

</style>
