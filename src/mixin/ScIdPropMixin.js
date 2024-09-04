export default {
  props: {
    query: {
      type: Object,
      default() {
        return {
          sc_id: null
        }
      }
    }
  },
  watch: {
    query: {
      handler(newValue) {
        this.query = newValue
      },
      deep: true
    }
  }
}