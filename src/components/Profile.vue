<template>
  <div>
    <Sidebar />
    <main>
  	  <h1>Profile</h1>
  	  <Logout />
    </main>
  </div>
</template>

<script>
import Logout from '@/components/Logout.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'profile',
  components: {
    Logout,
    Sidebar
  }
}
</script>
