<template>
  <div>
    <el-select v-model="currentValue" :filterable="filterable" @change="onSelect">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script>
import { fetchServerOptions, fetchClassifyOptions, fetchMachineOptions } from '@/api/common'

export default {
  name: 'CustomSelect',
  // 可以将model理解成使用该组件时生成的语法规则。<custom-select :value="outerValue" @change="outerValue = $event.target.value" />
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: [String, Number],
    // 值是{label: 'label', value: 'value'}的对象
    defaultOption: {
      type: Object,
      default: null
    },
    dataType: String,
    filterable: {
      type: Boolean,
      default: false
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      currentValue: this.value,
      options: []
    }
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue
    },
    query(newQuery, oldQuery) {
      const query = { with_default_value: 1, ...newQuery }
      if (this.defaultOption) {
        query.with_default_value = 0
      }
      this.fetchData(query)
    }
  },
  created() {
    this.$nextTick(() => {
      this.execute()
    })
  },
  methods: {
    execute() {
      const query = { with_default_value: 1, ...this.query }
      if (this.defaultOption) {
        query.with_default_value = 0
      }
      this.fetchData(query)
    },
    fetchData(query) {
      switch (this.dataType) {
        case 'machines':
          fetchMachineOptions(query).then(response => {
            const { data } = response
            this.options = this.filterResult(data)
          })
          break;
        case 'gifts':
          break;
        case 'classifies':
          fetchClassifyOptions(query).then(response => {
            const { data } = response
            this.options = this.filterResult(data)
          })
          break;
        // 服务器
        case 'servers':
          fetchServerOptions(query).then(response => {
            const { data } = response
            this.options = this.filterResult(data)
          })
          break;
        default:
          this.options = []
          this.value = null
      }
    },
    filterResult(result) {
      if (this.defaultOption) {
        result.unshift(this.defaultOption)
      }
      return result
    },
    onSelect(value) {
      this.$emit('change', value)
      this.$emit('select', value)
    }
  }
}
</script>
