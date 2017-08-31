<template>
  <div>
    <Sidebar />
    <main>
      <h1>Data</h1>
      <ol>
        <li v-for="contentType in contentTypes">
          <router-link :to="{ name: 'DataEdit', params: { contentTypeId: contentType['name'].toLowerCase() }}">
            <GridItem :title="contentType.name"></GridItem>
          </router-link>
        </li>
      </ol>
    </main>
  </div>
</template>

<script>
  import { db } from '@/firebase.js'
  import GridItem from '@/components/GridItem'
  import Sidebar from '@/components/Sidebar'

  export default {
    name: 'DataList',
    components: {
      GridItem,
      Sidebar
    },
    firebase: function () {
      return {
        contentTypes: db.ref('contentType/')
      }
    },
    data: function () {
      return {
        name: '',
        error: ''
      }
    }
  }
</script>
