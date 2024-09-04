<template>
  <div>
    <stacked-line-chart :xAxisData="xAxisData" :title="title" :series="series" />
  </div>
</template>

<script>
import StackedLineChart from '@/components/Charts/StackedLineChart'

export default {
  name: 'Demo',
  components: {
    StackedLineChart
  },
  data() {
    return {
      title: 'Title',
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [
        {
          name: '注册人数',
          color: '#FF005A',
          data: [100, -120, 161, 134, 105, 160, 165]
        },
        {
          name: 'actual',
          color: '#3888fa',
          data: [120, 82, -91, 154, 162, 140, 145]
        }
      ]
    }
  }
}
</script>

<style>

</style>