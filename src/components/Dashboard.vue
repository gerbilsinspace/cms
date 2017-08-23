<template>
  <div class="dashboard">
    <CMSHeader />
    <main>
      <h1>Dashboard</h1>
      <a href="/cms/profile">
        <DashboardGridItem title="Profile"></DashboardGridItem>
      </a>
      <a href="/cms/pages">
        <DashboardGridItem title="Pages"></DashboardGridItem>
      </a>
    </main>
  </div>
</template>

<script>
  import DashboardGridItem from '@/components/DashboardGridItem'
  import CMSHeader from '@/components/CMSHeader.vue'
  import Logout from '@/components/Logout.vue'

  export default {
    name: 'dashboard',
    components: {
      DashboardGridItem,
      CMSHeader,
      Logout
    }
  }
</script>

<style scoped>
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #35495E;
  }
</style>
