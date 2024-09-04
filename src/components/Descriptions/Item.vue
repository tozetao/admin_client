<template>
  <div>
    <slot name="label"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DescriptionsItem',
  props: {
    labelSpan: {
      type: Number,
      default: 1
    },
    contentSpan: {
      type: Number,
      default: 1
    },
    labelWidth: '',
    contentWidth: '',
    isLink: {
      type: Boolean,
      default: false
    }
  }
}
</script>
