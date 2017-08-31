<template>
  <div>
    <Sidebar />
    <main>
      <h1>Dashboard</h1>
    </main>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'dashboard',
    components: {
      Sidebar
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
