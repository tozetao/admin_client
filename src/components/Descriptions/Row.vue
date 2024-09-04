<script>
export default {
  name: 'DescriptionsRow',
  props: {
    // Object: { props: {...}, slots: { default: [VNode...], label: [...] }, vnode: VNode }
    // Item组件在使用时会作为一个slot插入到Index组件中，而Object对象是由Item slot转换而来的对象，props是Item组件的props，slots则是Item组件的slots，vnode是Item组件自身。
    rows: {
      type: Array,
      required: true
    },
    column: {
      type: Number,
      required: true
    }
  },
  render(createElement) {
    const grouped = []

    // 默认Item是由2个td组成，但是在使用时可以定义Item占据的td数量。
    // 总的td数 = columns * 2，这里时根据item占据的td数量，计算出每一行可以放入多少个item。
    const totalSpan = this.column * 2
    let index = 0
    let tmpNode = null
    while (index < this.rows.length) {
      let set = []
      let s = 0

      do {
        tmpNode = this.rows[index++]

        let labelSpan = tmpNode.props.labelSpan ? tmpNode.props.labelSpan : 1
        let contentSpan = tmpNode.props.contentSpan ? tmpNode.props.contentSpan : 1
        s += labelSpan + contentSpan
        set.push(tmpNode)
      } while (s <= totalSpan && ((totalSpan - s) >= 2) && index < this.rows.length)
      
      grouped.push(set)
    }

    const tbody = []
    grouped.forEach(nodes => {
      let tds = []

      nodes.forEach(node => {
        let labelSpan = node.props.labelSpan ? node.props.labelSpan : 1
        let contentSpan = node.props.contentSpan ? node.props.contentSpan : 1
        // bug: 一组中的最后一个节点的content span会占据剩下的内容
        if (nodes.length < this.column) {
          contentSpan = totalSpan - ((nodes.length - 1) * 2 + 1)
        }

        let labelWidth = node.props.labelWidth ? node.props.labelWidth : null
        let labelStyle = {}
        if (labelWidth) {
          labelStyle = { width: labelWidth }
        }
        let contentWidth = node.props.contentWidth ? node.props.contentWidth : null
        let contentStyle = {}
        if (contentWidth) {
          contentStyle = { width: contentWidth }
        }

        let contentClass = 'descriptions-item__cell descriptions-item__content'
        if (node.props.isLink) {
          contentClass = 'descriptions-item__cell descriptions--link descriptions-item__content'
        }
        // label
        tds.push(createElement('td', {
          attrs: { colspan: labelSpan },
          style: labelStyle,
          class: 'descriptions-item__cell descriptions-item__label'
        }, node.slots.label))
        // content
        tds.push(createElement('td', {
          attrs: { colspan: contentSpan },
          style: contentStyle,
          class: contentClass,
        }, node.slots.default))
      })

      tbody.push(createElement('tbody', [createElement('tr', tds)]))
    })

    return createElement('table', {
      attrs: {
        class: 'descriptions__table is-bordered descriptions--small'
      }
    }, [tbody])
  }
}
</script>

<style>

</style>