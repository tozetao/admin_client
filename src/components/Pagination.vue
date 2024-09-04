<template>
  <div>
    <div v-show="show">
      <!-- sizes,  -->
      <el-pagination
        ref="pagination"
        align="center"
        :layout="layout"
        :current-page="page"
        :total="total"
        :page-sizes="pageSizes"
        :prev-text="prevText"
        :next-text="nextText"
        :page-size="pageSize"
        @current-change="onChangePage"
        @size-change="onChangeSize"
      >
        <el-link :underline="false">{{ $t('common.enter') }}</el-link>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { translate } from '@/utils/i18n'

export default {
  name: 'Pagination',
  /* eslint-disable */
  props: {
    total: {
      type: Number,
      require: true
    },
    page: {
      type: Number,
      require: true
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    layout() {
      if (this.pageSizes.length) {
        return 'sizes, total, prev, pager, next, jumper, slot'
      }
      return 'total, prev, pager, next, jumper, slot'
    },
    show() {
      const pageCount = this.total / this.pageSize
      return Math.ceil(pageCount) > 1
    },
    prevText() {
      return translate('common.prev_page')
    },
    nextText() {
      return translate('common.next_page')
    }
  },
  created() {
    this.$nextTick(() => {
      this.pageSize = this.$refs['pagination'].pageSize
    })
  },
  methods: {
    onChangePage(value) {
      this.$emit('change-page', value)
    },
    onChangeSize(size) {
      this.$emit('change-size', size)
    }
  }
}
</script>

<style>

</style>