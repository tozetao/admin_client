<template>
  <div class="descriptions">
    <div v-if="title" class="descriptions__header">
      <div class="descriptions__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="descriptions__extra">
        <slot name="extra"></slot>
      </div>
    </div>
    <div class="descriptions__body">
      <descriptions-row :rows="getRows()" :column="column" />
      <!-- <table class="descriptions__table is-bordered descriptions--small"> -->
        <!-- <tbody>
          <tr>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">用户名</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__content">kooriookami</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">手机号</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__content">18100000000</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">居住地</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__content">苏州市</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">用户名</td>
            <td colspan="2" class="descriptions-item__cell descriptions-item__content">kooriookami</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">手机号</td>
            <td colspan="2" class="descriptions-item__cell descriptions-item__content">18100000000</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">备注</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__content">学校</td>
            <td colspan="1" class="descriptions-item__cell descriptions-item__label is-bordered-label">联系地址</td>
            <td colspan="3" class="descriptions-item__cell descriptions-item__content">江苏省苏州市吴中区吴中大道 1188 号</td>
          </tr>
        </tbody> -->
      <!-- </table> -->
    </div>
  </div>
</template>

<script>
import DescriptionsRow from '@/components/Descriptions/Row'
import { isFunction } from 'element-ui/src/utils/types'

export default {
  name: 'Descriptions',
  components: {
    DescriptionsRow
  },
  props: {
    border: {
      type: Boolean,
      default: true
    },
    column: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  methods: {
    getOptionProps(vnode) {
      if (vnode.componentOptions) {
        const componentOptions = vnode.componentOptions
        const {propsData = {}, Ctor = {}} = componentOptions
        const props = (Ctor.options || {}).props || {}
        const res = {}
        for (const k in props) {
          const v = props[k]
          const defaultValue = v.default
          if (defaultValue !== undefined) {
            res[k] = isFunction(defaultValue) ? defaultValue.call(vnode) : defaultValue
          }
        }
        return { ...res, ...propsData }
      }
      return {}
    },
    getSlots(vnode) {
      let componentOptions = vnode.componentOptions || {}
      const children = vnode.children || componentOptions.children || []
      const slots = {}
      children.forEach(child => {
        if (!this.isEmptyElement(child)) {
          const name = (child.data && child.data.slot) || 'default'
          slots[name] = slots[name] || []
          if (child.tag === 'template') {
            slots[name].push(child.children)
          } else {
            slots[name].push(child)
          }
        }
      })
      return { ...slots }
    },
    isEmptyElement(c) {
      return !(c.tag || (c.text && c.text.trim() !== ''))
    },
    filledNode(node, span, count, isLast = false) {
      if (!node.props) {
        node.props = {}
      }
      if (span > count) {
        node.props.span = count
      }
      if (isLast) {
        // set the max span, cause of the last td
        node.props.span = count
      }
      return node
    },
    getRows() {
      // const children = ((this.$slots.default || []).filter(vnode => vnode.tag &&
      //       vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElDescriptionsItem'));
      const children = this.$slots.default
      const nodes = children.map(vnode => {
        return {
          props: this.getOptionProps(vnode),
          slots: this.getSlots(vnode),
          vnode
        }
      })
      return nodes
    }
  }
}
</script>

<style lang="scss">
  .descriptions {
    box-sizing: border-box;
    font-size: 14px;
    color: #303133;
  }
  .descriptions__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .descriptions__title {
    font-size: 16px;
    font-weight: 700;
  }

  .descriptions__body {
    color: #606266;
    background-color: #fff;

    .descriptions__table {
      border-collapse: collapse;
      width: 100%;
      table-layout: fixed;
      
      .descriptions-item__cell {
        box-sizing: border-box;
        text-align: left;
        font-weight: 400;
        line-height: 1.5;
      }
    }
  }

  // 为表格增加边框
  .descriptions .is-bordered {
    table-layout: auto;

    .descriptions-item__cell {
      border: 1px solid #ebeef5;
      padding: 12px 10px;
    }
    
    .descriptions-item__cell.descriptions--link {
      padding: 0;
      a {
        display: block;
        text-decoration: none;
        padding: 12px 10px;
      }
    }
    .descriptions--link:hover {
      background: #fafafa;
    }

    // .descriptions-item__link {
    //   display: block;
    //   text-decoration: none;
    //   padding: 12px 10px;
    //   background: rgb(225, 243, 216);
    //   background: rgb(240, 249, 235);
    // }
  }

  .descriptions-item__label {
    font-weight: 700;
    color: #909399;
    background: #fafafa;
  }

  .descriptions-item__content {
    word-break: break-word;
    overflow-wrap: break-word;
  }

  // 修饰表格字体大小
  .descriptions--small {
    font-size: 12px;
  }

  // .descriptions-item__label.is-bordered-label {
  //   font-weight: 700;
  //   color: #909399;
  //   background: #fafafa;
  // }

  // .descriptions--small.is-bordered {
  //   .descriptions-item__cell {
  //     padding: 8px 10px;
  //   }
  // }

  // .descriptions-item {
  //   vertical-align: top;
  // }
</style>
