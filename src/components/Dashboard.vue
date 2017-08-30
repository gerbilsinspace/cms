<template>
  <div class="dashboard">
    <CMSHeader />
    <main>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <router-link to="/data">
            <GridItem title="Data"></GridItem>
          </router-link>
        </li>
        <li>
          <router-link to="/images">
            <GridItem title="Images"></GridItem>
          </router-link>
        </li>
        <li>
          <router-link to="/content-types">
            <GridItem title="Content Types"></GridItem>
          </router-link>
        </li>
        <li>
          <router-link to="/profile">
            <GridItem title="Profile"></GridItem>
          </router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
  import GridItem from '@/components/GridItem'
  import CMSHeader from '@/components/CMSHeader.vue'

  export default {
    name: 'dashboard',
    components: {
      GridItem,
      CMSHeader
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
