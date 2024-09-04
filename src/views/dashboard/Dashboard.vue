<template>
  <div>
    <admin-dashboard />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import AdminDashboard from '@/views/dashboard/AdminDashboard'

export default {
  name: 'Dashboard',
  components: {
    AdminDashboard
  },
  computed: {
    ...mapGetters(['belongsToCentralServer', 'user'])
  }
}
</script>
